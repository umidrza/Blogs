const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDatabase, login, createBlog, likeTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('/login')
      await login(page, 'root', 'sekret')
      await expect(page.getByText('Welcome root')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('/login')
      await login(page, 'root', 'wrong')

      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByText('Welcome root')).not.toBeVisible()
    })
  })
})