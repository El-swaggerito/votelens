export type LocalAuthUser = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
};

export type LocalSession = {
  id: string;
  fullName: string;
  email: string;
};

const USERS_KEY = "votelens.local-auth.users";
const SESSION_KEY = "votelens.local-auth.session";

function isBrowser() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getStoredUsers() {
  return readJson<LocalAuthUser[]>(USERS_KEY, []);
}

export function getStoredSession() {
  return readJson<LocalSession | null>(SESSION_KEY, null);
}

export function setStoredSession(session: LocalSession | null) {
  if (!isBrowser()) {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }

  writeJson(SESSION_KEY, session);
}

export function clearStoredSession() {
  setStoredSession(null);
}

export function createSessionFromUser(user: LocalAuthUser): LocalSession {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

export function signUpLocalUser(input: {
  fullName: string;
  email: string;
  password: string;
}) {
  const fullName = input.fullName.trim();
  const email = normalizeEmail(input.email);
  const password = input.password;
  const users = getStoredUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return {
      ok: false as const,
      message: "An account with this email already exists.",
    };
  }

  const user: LocalAuthUser = {
    id: crypto.randomUUID(),
    fullName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_KEY, [...users, user]);
  const session = createSessionFromUser(user);
  setStoredSession(session);

  return {
    ok: true as const,
    user,
    session,
  };
}

export function signInLocalUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const password = input.password;
  const users = getStoredUsers();

  const user = users.find((entry) => entry.email === email);

  if (!user || user.password !== password) {
    return {
      ok: false as const,
      message: "Incorrect email or password.",
    };
  }

  const session = createSessionFromUser(user);
  setStoredSession(session);

  return {
    ok: true as const,
    user,
    session,
  };
}

export function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "VL";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}
