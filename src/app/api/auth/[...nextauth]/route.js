import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'E-mail' },
        senha: { label: 'Senha', type: 'password', placeholder: 'Senha' }
      },
      async authorize(credentials, req) {

        // Verifica se está faltando dados
        if (!credentials.email || !credentials.senha) {
          throw new Error('Está faltando crendenciais!')
        }

        if (credentials.email === 'teste@gmail.com' && credentials.senha === '1234') {
          // Any object returned will be saved in `user` property of the JWT
          const user = { id: '1', name: 'Teste', email: 'teste@gmail.com' }

          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details. 
          throw new Error('Crendenciais Inválidas!')

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }