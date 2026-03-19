
const login = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create new Blog' }).click()

  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)

  await page.getByRole('button', { name: 'Create Blog' }).click()
  await page.getByText(`${title} by ${author}`).first().waitFor()
}

const resetDatabase = async (request) => {
  await request.post('/api/testing/reset')

  await request.post('/api/users', {
    data: {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
  })

  await request.post('/api/users', {
    data: {
      name: 'Ted Tester',
      username: 'ted',
      password: 'tedsecret'
    }
  })
}


const likeTimes = async (page, button, n) => {
  for (let i = 0; i < n; i++) {
    await button.click()
    await page.getByText(`likes ${i + 1}`).waitFor()
  }
}

export { resetDatabase, login, createBlog, likeTimes }