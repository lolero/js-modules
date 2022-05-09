import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

function mapUser(user: admin.auth.UserRecord) {
  const customClaims = (user.customClaims || { role: '' }) as { role?: string };
  const role = customClaims.role ? customClaims.role : '';
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

export async function getAll(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).send(users);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
}

export async function createOne(req: Request, res: Response) {
  try {
    const { displayName, password, email, role } = req.body;

    if (!displayName || !password || !email || !role) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, { role });
    const user = await admin.auth().getUser(uid);

    return res.status(201).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function updateOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id || !role) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);

    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
}

export async function deleteOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);
    return res.status(204).send({});
  } catch (err) {
    return handleError(res, err);
  }
}
