import { Request, Response } from 'express';
import { createUser, findOne, getAllUsers, getById, logicalElimination, physicalElimination, update } from '../services/users';

export const getUsers = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json({ users });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getById(id);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        })
    }
    res.status(200).json({
        user
    });
}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        //TODO: Crear middleware para que no llegue al controler en caso de que ya exista un user con el email que se manda
        const existEmail = await findOne(body.email);
        if (existEmail)
            return res.status(400).json({
                msg: 'The email is already in use'
            })
        const newUser = await createUser(body);
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

export const putUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const userDB = await getById(id);
        if (!userDB)
            return res.status(404).json({
                msg: `There is no user with id ${id}`
            })
        await update(userDB, body);
        res.status(200).json({ userDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userDB = await getById(id);
    if (!userDB)
        return res.status(404).json({
            msg: `There is no user with id ${id}`
        })
    // Eliminacion fisica
    // await physicalElimination(userDB);
    // Eliminacion logica
    await logicalElimination(userDB);
    res.json({
        msg: 'Deleted user'
    });
}