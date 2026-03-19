const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'sekret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Login')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
  })


  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'sekret')

      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('Superuser logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'Author', 'http://www.example.com')
      await expect(page.getByText('a new blog a blog created by playwright by Author added')).toBeVisible()
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'author', 'http://www.example.com')
        await createBlog(page, 'second blog', 'author', 'http://www.example.com')
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'first blog' });

        await blog.getByRole('button', { name: 'view' }).click();
        await blog.getByRole('button', { name: 'like' }).click();

        await expect(blog).toContainText('1 likes');
      })

      test('blogs are ordered by likes (descending)', async ({ page }) => {
        const orderedBlogs = page.locator('.blog')

        await expect(orderedBlogs.nth(0)).toContainText('first blog')
        await expect(orderedBlogs.nth(1)).toContainText('second blog')
      })

      test('user can delete their own blog', async ({ page }) => {
        const blog = page.locator('.blog').filter({ hasText: 'second blog' });

        await blog.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })

        await blog.getByRole('button', { name: 'remove' }).click()

        await expect(blog.getByText('second blog')).not.toBeVisible()
      })
    })
  })
})