const MOCK_USER = {
  uid: 'mock-user-001',
  email: 'demo@renthub.com',
  displayName: 'Demo User',
  photoURL: null,
};

class MockAuth {
  constructor() {
    this._user = null;
    this._listeners = [];
  }

  get currentUser() {
    return this._user;
  }

  async signInWithEmailAndPassword(email, password) {
    this._user = { ...MOCK_USER, email };
    this._notifyListeners();
    return { user: this._user };
  }

  async createUserWithEmailAndPassword(email, password) {
    this._user = { ...MOCK_USER, email, uid: 'mock-user-' + Date.now() };
    this._notifyListeners();
    return { user: this._user };
  }

  async signOut() {
    this._user = null;
    this._notifyListeners();
  }

  onAuthStateChanged(callback) {
    this._listeners.push(callback);
    callback(this._user);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== callback);
    };
  }

  _notifyListeners() {
    this._listeners.forEach((cb) => cb(this._user));
  }
}

class MockFirestore {
  constructor() {
    this._collections = {};
  }

  collection(name) {
    if (!this._collections[name]) {
      this._collections[name] = new MockCollection(name);
    }
    return this._collections[name];
  }
}

class MockCollection {
  constructor(name) {
    this.name = name;
    this._docs = new Map();
  }

  doc(id) {
    if (!this._docs.has(id)) {
      this._docs.set(id, new MockDocRef(this, id));
    }
    return this._docs.get(id);
  }

  async add(data) {
    const id = 'mock-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    this._docs.set(id, new MockDocRef(this, id));
    this._docs.get(id)._data = { ...data, id };
    return { id };
  }

  async get() {
    const docs = [];
    this._docs.forEach((doc, id) => {
      if (doc._data) {
        docs.push({ id, data: () => doc._data });
      }
    });
    return { docs, size: docs.length, empty: docs.length === 0 };
  }
}

class MockDocRef {
  constructor(collection, id) {
    this._collection = collection;
    this.id = id;
    this._data = null;
  }

  async get() {
    return {
      exists: this._data !== null,
      id: this.id,
      data: () => this._data,
    };
  }

  async set(data) {
    this._data = { ...data, id: this.id };
  }

  async update(data) {
    if (this._data) {
      this._data = { ...this._data, ...data };
    }
  }

  async delete() {
    this._data = null;
    this._collection._docs.delete(this.id);
  }
}

export const auth = new MockAuth();
export const db = new MockFirestore();
export default { auth, db };
