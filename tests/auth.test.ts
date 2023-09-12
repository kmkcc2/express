import { isNonNullChain } from 'typescript'
import app from '../app'
import { User } from '../src/models/user'
import UserRepository from '../src/repositories/user.repository'
import supertest from 'supertest'

const userPayload = new User({
  id: -1,
  firstName: 'test',
  lastName: 'test',
  email: 'em@il.com',
  password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
  createdAt: '2023-08-28T14:16:22.339Z' as unknown as Date,
  updatedAt: '2023-08-28T14:16:22.339Z' as unknown as Date
})
describe('POST to /login', () => {
  test('should respond with a 200 status code', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValueOnce(userPayload)
    const { statusCode } = await supertest(app).post('/login').send({
      email: 'em@il.com',
      password: 'qwerty123'
    })
    expect(statusCode).toBe(200)
    expect(UserRepositoryMock).toBeCalled()
  })

  test('should respond with a 404 when email invalid', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValueOnce(null)
    const { statusCode } = await supertest(app).post('/login').send({
      email: 'invalid@email.com',
      password: 'qwerty123'
    })
    expect(statusCode).toBe(404)
    expect(UserRepositoryMock).toBeCalled()
  })

  test('should respond with a 401 when password invalid', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValueOnce(userPayload)
    const { statusCode } = await supertest(app).post('/login').send({
      email: 'em@il.com',
      password: 'invalidPassword'
    })
    expect(statusCode).toBe(401)
    expect(UserRepositoryMock).toBeCalled()
  })

  test('should respond with a 400 when email not an actual email', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByEmail').mockResolvedValueOnce(userPayload)
    const { statusCode } = await supertest(app).post('/login').send({
      email: 'em',
      password: 'invalidPassword'
    })
    expect(statusCode).toBe(400)
    expect(UserRepositoryMock).toBeCalled()
  })
})
