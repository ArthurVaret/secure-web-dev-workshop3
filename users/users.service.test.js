const usersService = require('./users.service')
const usersModel = require('./users.model')

jest.mock('./users.model')

describe('Get all users', () => {
    it('Should null when not found', async () => {
        usersModel.find.mockResolvedValue({})
        const findSpy = jest.spyOn(usersModel, 'find')
        expect(await usersService.findAll()).toEqual(null)
        expect(findSpy).toHaveBeenCalledTimes(1)

    })
    it('Should return users', async () => {
        const user = {_id: "123456789", username: "Arthur", role: "admin"};
        usersModel.find.mockResolvedValue(user)
        const findSpy = jest.spyOn(usersModel, 'find')
        const test = await usersService.findAll()
        console.log("test")
        console.log(test)
        expect(await usersService.findAll()).toEqual(user)
        expect(findSpy).toHaveBeenCalledTimes(1)
    })
} );

describe('Get one user', () => {
    it('Should null when not found', async () => {
        usersModel.find.mockResolvedValue({})
        expect(await usersService.userMe()).toEqual(null)
    })
    it('Should return user', async () => {
        const user = {_id: "123456789", username: "Arthur", role: "admin"};
        usersModel.find.mockResolvedValue(user)
        expect(await usersService.userMe("123456789")).toEqual(user);
    })
} );