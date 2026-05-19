import Table from '@/components/Table';
import { Eye, Star } from 'lucide-react';

const Products = () => {
  const data = [
    {
      name: 'test',
      age: 'test',
    },
    {
      name: 'test',
      age: 'test',
    },
    {
      name: 'test',
      age: 'test',
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      {/* <Table data={data} headers={["name", "age","action"]} title="Products List" buttonText="Add Product" page={1} limit={10} TotalPages={50} totalData={3} length={3}>
        {
          data.map((item) => (
            <tr  key={item.name} className='bg-gray-100' >
              <td className='px-5' >{item.name}</td>
              <td>{item.age}</td>
              <td className='flex text-amber' >
                <Star/>
                <Eye/>
              </td>

            </tr>
          ))
        }
      </Table> */}
    </div>
  );
};

export default Products;
