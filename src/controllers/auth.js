
import * as authServices from "../services/auth.js";
import { requestResetToken } from '../services/auth.js';
import { resetPassword } from '../services/auth.js';
import { generateAuthUrl } from "../utils/googleOAuth2.js";


const setupSession = (res, session) => {
    const { _id, refreshToken, refreshTokenValidUntil } = session;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });

};

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);


    res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: data,
  });
    // res.status(201).json({
    //     status: 201,
    //     message: "Successfully registered a user!",
    //     data: {
    //         name:data.name,
    //         email: data.email,
    //         _id: data._id,
    //         createdAt: data.createdAt,
    //         updatedAt:data.updatedAt,
    //     }
    // });
};

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body);

    setupSession(res, session);


     res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshSessionController = async (req, res) => {
    const session = await authServices.refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await authServices.logoutUser(req.cookies.sessionId);
    }
    res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

    res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {

    await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};


export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await authServices.loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

