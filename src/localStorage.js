const store = {
  key: 'cspa-user',
  init(){
    if(!store.get()){
      store.set([]);
    }
  },
  get(){
    const item = localStorage.getItem(store.key);
    return item !=null ? JSON.parse(item) : false;
  },
  set(item){
    localStorage.setItem(store.key, JSON.stringify(item));
    return true;
  },
  clear(){
    return store.set(null);
  },
  isLoggedIn(){
    const user = store.get();
    return Object.keys(user).length > 0;
  }
};

export default store;
