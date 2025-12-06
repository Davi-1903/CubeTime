export default function Footer() {
    return (
        <footer className='bg-color-text-dark col-span-2 p-4'>
            <p className='md:text-md font-primary text-color1-normal text-center text-sm'>
                Copyright {new Date().getFullYear()}. All rights reserved
            </p>
        </footer>
    );
}
