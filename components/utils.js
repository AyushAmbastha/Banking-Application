import Router from 'next/router';
import Cookies from 'js-cookie';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_KEY;

export function getAppCookies(req) {
  const parsedItems = {};
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}


export const validateFields = (fieldsToValidate) => {
  return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};

export function setLogout(e) {
  e.preventDefault();
  Cookies.remove('token');
  Router.push('/');
}