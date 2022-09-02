import { User } from 'src/users/schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '1',
    email: 'email@test.com',
    age: 0,
    favoriteFoods: ['peperoni'],
  };
};
