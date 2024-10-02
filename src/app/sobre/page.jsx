import { Button } from '@/components/ui/button'
import PeopleCard from './components/PeopleCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Small } from '@/components/custom/typo/Small'
import { P } from '@/components/custom/typo/P'
import Image from 'next/image'

export default function Home() {
  const members = [
    {
      name: 'Pedro Pessuto',
      linkedin: 'https://www.linkedin.com/in/pedro-pessuto/',
      photo: '/people/Pedro.jpg',
      role: 'Desenvolvedor',
      description: 'Responsável pelo desenvolvimento web e integração com back-end.',
      teacher: 'Prof. Joaquim Pessoa Filho',
    },
  ]

  const teachers = [
    {
      name: 'Joaquim Pessoa Filho',
      linkedin: 'https://www.linkedin.com/in/joaquimpfilho/',
      photo: '/people/JoaquimPessoaFilho.jpeg',
      role: 'Professor',
    },
  ]


  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex flex-1 mt-16 bg-gray-100'>
        <div className='flex flex-col md:flex-row mt-8'>
          <section className='w-full md:w-1/2 p-8'>
            <h2 className='text-3xl font-bold mb-4'>Sobre o Projeto</h2>
            <p>
              O MaturAI é um software desenvolvido para prever a idade óssea a partir de radiografias. Utilizando
              técnicas avançadas de inteligência artificial, o MaturAI oferece resultados precisos e rápidos, auxiliando
              médicos e profissionais da saúde na avaliação da maturação óssea de pacientes.
              Feito em parceria com Mackenzie e Santa Casa.
            </p>
          </section>
          <section className='w-full md:w-1/2 p-8 '>
            <h2 className='text-3xl font-bold mb-4'>Equipe do Projeto</h2>

            <div className='flex  md:flex-col gap-4'>
              {members.map((member, index) => (
                <Card key={index}>
                  <div className='flex gap-4 p-4 flex-col md:flex-row'>
                    <div className='flex items-center justify-center relative w-full sm:w-1/2'>
                      <Image
                        src={member.photo}
                        width={'500'}
                        height={'500'}
                        className='w-full rounded-lg'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='w-full sm:w-1/2'>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription><strong>{member.role}</strong></CardDescription>
                        <CardDescription>Professor orientador: {member.teacher}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Small></Small>
                        <P>{member.description}</P>
                      </CardContent>
                      <CardFooter>
                        <Link href={member.linkedin}>
                          <Button className='flex items-center justify-center gap-4'>
                            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z'></path></svg>
                            LinkedIn
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>

                </Card>
              ))}
            </div>

            <h2 className='text-3xl font-bold mt-8 mb-4'>Professores Orientadores</h2>
            <div className='flex  md:flex-col gap-4'>
              {teachers.map((member, index) => (
                <Card key={index}>
                  <div className='flex gap-4 p-4 flex-col md:flex-row'>
                    <div className='flex items-center justify-center relative w-full sm:w-1/2'>
                      <Image
                        src={member.photo}
                        width={'500'}
                        height={'500'}
                        className='w-full rounded-lg'
                        alt='Picture of the author'
                      />
                    </div>
                    <div className='w-full sm:w-1/2'>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription><strong>{member.role}</strong></CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Small></Small>
                        <P>{member.description}</P>
                      </CardContent>
                      <CardFooter>
                        <Link href={member.linkedin}>
                          <Button className='flex items-center justify-center gap-4'>
                            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1rem' width='1rem' xmlns='http://www.w3.org/2000/svg'><path d='M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z'></path></svg>
                            LinkedIn
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>

                </Card>
              ))}
            </div>

          </section>
        </div>
      </main>
    </div>
  )
}
