import Image from "next/image";
import Link from "next/link";

export default function Home() {



  const Card = ({ title, subtitle, text, buttonText, href, fromColor, toColor }) => (
    <div className="bg-stone-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow text-center">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <h4 className="text-2xl font-semibold mb-4">{subtitle}</h4>

      <p className="text-gray-600 mb-6">{text}</p>
      <Link href={href}>
      <button className={`text-white px-4 py-2 rounded transition bg-gradient-to-b ${fromColor} ${toColor}`}>
        {buttonText}
      </button></Link>
    </div>
  );
  
  const CardRow = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-32">
        <Card 
          title="Lawful" 
          subtitle="(Standard Character)"
          text="This is the description for the first card." 
          buttonText="Create Character"
          href="/standard"
          fromColor="from-sky-600" 
          toColor="to-sky-400"
        />
        <Card 
          title="Neutral" 
          subtitle="(Quick Character)"
          text="This is the description for the second card." 
          buttonText="Create Character"
          href="/quick" 
          fromColor="from-emerald-600"
          toColor="to-emerald-400"
        />
        <Card 
          title="Chaotic" 
          subtitle="Custom Character"
          text="This is the description for the third card." 
          buttonText="Create Character" 
          href="/custom"
          fromColor="from-rose-600"
          toColor="to-rose-400"
        />
      </div>
    );
  };
  

  return (
    <div>
       <CardRow />
     
    </div>
  );
}
