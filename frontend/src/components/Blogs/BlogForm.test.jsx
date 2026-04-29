import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { vi } from "vitest";
import { addBlog } from "../../reducers/blogs";

// mocks
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../hooks/useNotification", () => ({
  useNotification: vi.fn(),
}));

vi.mock("../../reducers/blogs", () => ({
  addBlog: vi.fn(),
}));

describe("BlogForm", () => {
  test("calls addBlog, notification and hideMe with correct data", async () => {
    const user = userEvent.setup();

    const dispatch = vi.fn(() => Promise.resolve());
    const notify = vi.fn();
    const hideMe = vi.fn();

    const { useDispatch } = await import("react-redux");
    const { useNotification } = await import("../../hooks/useNotification");

    useDispatch.mockReturnValue(dispatch);
    useNotification.mockReturnValue(notify);

    addBlog.mockImplementation((data) => ({
      type: "blogs/addBlog",
      payload: data,
    }));

    render(<BlogForm hideMe={hideMe} />);

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const urlInput = screen.getByLabelText(/url/i);
    const button = screen.getByRole("button", { name: /create blog/i });

    await user.type(titleInput, "Test Blog");
    await user.type(authorInput, "John Doe");
    await user.type(urlInput, "http://example.com");

    await user.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(addBlog).toHaveBeenCalledWith({
      title: "Test Blog",
      author: "John Doe",
      url: "http://example.com",
    });

    expect(notify).toHaveBeenCalledWith(
      "A new blog 'Test Blog' by 'John Doe' added",
      "success"
    );

    expect(hideMe).toHaveBeenCalled();
  });
});