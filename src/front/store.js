
export const initialStore = () => {
  return {
    // Al cargar la app, lee el token del sessionStorage para no perder la sesión al recargar
    token: sessionStorage.getItem("token") || null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    // ==========================================
    // CASOS PARA CONTROL DE AUTENTICACIÓN
    // ==========================================
    case 'login_user':
      return {
        ...store,
        token: action.payload
      };

    case 'logout_user':
      return {
        ...store,
        token: null
      };

    default:
      throw Error('Unknown action.');
  }    
}
