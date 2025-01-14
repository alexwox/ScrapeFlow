import Logo from "@/components/Logo";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col items-center justify-center h-screen gap-4">
     <Logo /> 
     {children} 
     </div>;
}
