export default function PeopleCard({ name, linkedin, role, description, advisor }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <h3 className='text-xl font-semibold'>{name}</h3>
      <p className='text-blue-500'><a href={linkedin} target='_blank' rel='noopener noreferrer'>LinkedIn</a></p>
      <p className='text-gray-700'><strong>Função:</strong> {role}</p>
      <p className='text-gray-700'>{description}</p>
      <p className='text-gray-700'><strong>Professor Orientador:</strong> {advisor}</p>
    </div>
  )
}
