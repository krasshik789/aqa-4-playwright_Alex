import { NOTIFICATIONS } from "./notifications";

export const invalidUsernames = [
      { username: '', error: NOTIFICATIONS.USERNAME_REQUIRED },
      { username: 'ab', error: NOTIFICATIONS.USERNAME_MINLENGTH },
      { username: ' User', error: NOTIFICATIONS.USERNAME_SPACES },
      { username: 'User ', error: NOTIFICATIONS.USERNAME_SPACES },
      { username: '     ', error: NOTIFICATIONS.USERNAME_SPACES },
    ];
export const invalidPasswords = [
      { password: '', error: NOTIFICATIONS.PASSWORD_REQUIRED },
      { password: '12345qQ', error: NOTIFICATIONS.PASSWORD_MINLENGTH },
      { password: 'QWERTYUIO', error: NOTIFICATIONS.PASSWORD_UPPERCASE },
      { password: 'qwertyuiop', error: NOTIFICATIONS.PASSWORD_LOWERCASE },
      { password: '     ', error: NOTIFICATIONS.PASSWORD_SPACES },
    ];