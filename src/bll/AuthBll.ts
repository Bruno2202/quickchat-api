export default class AuthBll {
    static async login(id: string, username: string) {
        try {
            if (!id) {
                throw new Error("ID usuário inválido")
            }

            if (!username || username.length < 1 || username.length > 15) {
                throw new Error("Nome inválido")
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}