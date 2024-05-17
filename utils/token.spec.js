const { describe, it, expect, jest } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const { generateUserToken } = require('./token');

describe('token', () => {
    it('should if jwt.sign was called when the token is generated', () => {
        const spyJwtSign = jest.spyOn(jwt, 'sign');
    
        const mockUser = {
          name: 'Douglas Junior',
          email: 'douglas@mail.com',
        };
        generateUserToken(mockUser);
    expect(spyJwtSign).toHaveBeenCalledTimes(1);
        expect(spyJwtSign).toHaveBeenCalledWith(mockUser, process.env.JWT_TOKEN, {
          expiresIn: '7d',
        });
    
        spyJwtSign.mockRestore();
      });

      it('should return a valid json web token', () => {
        const mockUser = {
          name: 'Douglas Junior',
          email: 'douglas@mail.com',
        };
        const token = generateUserToken(mockUser);
    
        const payload = jwt.verify(token, process.env.JWT_TOKEN);
    
        expect(payload).toEqual({
          ...mockUser,
          iat: expect.any(Number),
          exp: expect.any(Number),
        });
      });
    });

    