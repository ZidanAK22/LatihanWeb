import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">      
      
      <Image src="/monkey.png" alt="profile-picture" height={384} width={384} className="rounded-full"/>
      <p className="text-xl tracking-widest font-bold">xXxCrazy69__69MonkeyxXx</p>
      <div className="flex flex-row justify-between w-full bg-slate-500">
        <Image src="/monkey.png" alt="brand" height={64} width={64} />           
        <Image src="/monkey.png" alt="brand" height={64} width={64} />      
        <Image src="/monkey.png" alt="brand" height={64} width={64} />      
        <Image src="/monkey.png" alt="brand" height={64} width={64} />      
      </div>
      <div className="flex flex-col justify-between">
        <Image src="/monkey.png" alt="profile" width={128} height={128} />
      </div>
    </main>
  )
}
