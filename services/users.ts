import User from "../models/user"

export const getAllUsers = async () => await User.findAll();
export const getById = async (id: any) => await User.findByPk(id);
export const createUser = async (body: any) => await User.create(body);
export const findOne = async (email: string) => await User.findOne({
    where: {
        email
    }
});
export const update = async (user: any, body: any) => await user.update(body);
export const physicalElimination = async (user: any) => await user.destroy();
export const logicalElimination = async (user: any) => await user.update({ state: 0 });