import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    {
      id: 1,
      title: 'Face Wash & Cleansers',
      count: '12 Products',
      src: '/images/catagory/faceWash.jpg',
    },
    {
      id: 2,
      title: 'Lip Couture & Lipsticks',
      count: '8 Products',
      src: '/images/catagory/lipstik.jpg',
    },
    {
      id: 3,
      title: 'Clinical Serums & Elixirs',
      count: '15 Products',
      src: '/images/catagory/serume.jpg',
    },
    {
      id: 4,
      title: 'Hydrating Moisturizers',
      count: '9 Products',
      src: '/images/catagory/Moisturizers.jpg',
    },
    {
      id: 5,
      title: 'Botanical Face Masks',
      count: '14 Products',
      src: '/images/catagory/faceMask.jpg',
    },
    {
      id: 6,
      title: 'Luxury Eye Care',
      count: '7 Products',
      src: '/images/catagory/eyeCare.jpg',
    },
  ];

  return NextResponse.json(categories);
}