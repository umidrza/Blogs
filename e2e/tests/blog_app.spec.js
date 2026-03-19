const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDatabase, login, createBlog, likeTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'root', 'sekret')
      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'root', 'wrong')

      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Superuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Testing with Playwright', 'Tester', 'http://www.example.com')
      await expect(page.getByText('Testing with Playwright by Tester').first()).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Testing with Playwright', 'Tester', 'http://www.example.com')
      })

      test('it can be liked', async ({ page }) => {
        const blog = page.locator('.blog').first()

        await blog.getByRole('button', { name: 'view' }).click()
        await blog.getByRole('button', { name: 'like' }).click()

        await expect(blog).toContainText('1 likes');
      })

      test('it can be deleted by the creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Testing with Playwright by Tester')).not.toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog1', 'Ted Tester', 'http://example.com/1')
        await createBlog(page, 'blog2', 'Ted Tester', 'http://example.com/2')
        await createBlog(page, 'blog3', 'Ted Tester', 'http://example.com/3')
      })

    })
  })
})