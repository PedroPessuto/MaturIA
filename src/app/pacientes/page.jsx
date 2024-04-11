import PacientesTable from '@/components/custom/table/PacientesTable'


export default async function Page() {

  async function getData() {
    return [
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawd funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedro edawdawiz com tudo funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawdao funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedro esdawda'
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawd funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedro edawdawiz com tudo funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawdao funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedro esdawda'
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawd funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedro edawdawiz com tudo funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'Pedawdao funcionando',
      },
      {
        id: '659fa0d6-554a-435c-b84b-243fb4cb2166',
        nome: 'teste'
      },

    ]
  }

  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex flex-col gap-8 my-auto">
        <div className='flex w-full'>
        </div>
        <PacientesTable data={data} />
      </div>
    </main>
  )
}
