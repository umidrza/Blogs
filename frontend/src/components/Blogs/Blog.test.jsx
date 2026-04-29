import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { vi } from "vitest";

/* ---------------- mocks ---------------- */

const dispatchMock = vi.fn();
const notifyMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
  useSelector: (fn) =>
    fn({
      blogs: [
        {
          id: "1",
          title: "Test Blog",
          author: "John Doe",
          url: "http://example.com",
          likes: 5,
          user: { id: "u1", name: "Admin" },
          comments: [],
        },
      ],
    }),
}));

vi.mock("../../hooks/useNotification", () => ({
  useNotification: () => notifyMock,
}));

vi.mock("../../reducers/blogs", () => ({
  updateBlog: vi.fn(),
  removeBlog: vi.fn(),
  commentBlog: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: "1" }),
  };
});

/* import mocked actions AFTER mock definition */
import {
  updateBlog,
  removeBlog,
  commentBlog,
} from "../../reducers/blogs";

/* ---------------- tests ---------------- */

describe("Blog component", () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    notifyMock.mockClear();
    navigateMock.mockClear();
  });

  test("renders blog content", () => {
    render(<Blog />);

    expect(screen.getByText(/test blog/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/5 likes/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });

  test("likes blog", async () => {
    const user = userEvent.setup();

    render(<Blog />);

    const likeBtn = screen.getByRole("button", { name: /like/i });
    await user.click(likeBtn);

    expect(dispatchMock).toHaveBeenCalled();

    expect(updateBlog).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        likes: 6,
        user: "u1",
      })
    );

    expect(notifyMock).toHaveBeenCalledWith(
      "A like for the blog 'Test Blog' by 'John Doe'",
      "success"
    );
  });

  test("removes blog after confirm", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<Blog />);

    const removeBtn = screen.getByRole("button", { name: /remove/i });
    await user.click(removeBtn);

    expect(dispatchMock).toHaveBeenCalled();
    expect(removeBlog).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" })
    );

    expect(notifyMock).toHaveBeenCalledWith(
      "The blog 'Test Blog' deleted",
      "success"
    );

    expect(navigateMock).toHaveBeenCalledWith("/blogs");
  });

  test("adds comment", async () => {
    const user = userEvent.setup();

    render(<Blog />);

    const input = screen.getByPlaceholderText(/add a comment/i);
    const btn = screen.getByRole("button", { name: /comment/i });

    await user.type(input, "Nice post!");
    await user.click(btn);

    expect(dispatchMock).toHaveBeenCalled();
    expect(commentBlog).toHaveBeenCalledWith("1", "Nice post!");

    expect(notifyMock).toHaveBeenCalledWith("Comment added!", "success");
  });

  test("does not allow empty comment", async () => {
    const user = userEvent.setup();

    render(<Blog />);

    const btn = screen.getByRole("button", { name: /comment/i });
    await user.click(btn);

    expect(dispatchMock).not.toHaveBeenCalled();
    expect(notifyMock).toHaveBeenCalledWith(
      "Comment cannot be empty",
      "error"
    );
  });
});