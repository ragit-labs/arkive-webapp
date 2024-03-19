
import { BookMarkCard } from "../components/Card";
import { NavBar } from "../components/NavBar";
export const Home = () => {
    


    const data = [
        {
            description: "Most of you probably think that when you're released into the so-called real world you'll eventually have to get some kind of job. That's not true, and today I'm going to talk about a trick you can use to avoid ever having to get a job. The trick is to start your own company. So it's not a trick for avoiding work, because if you start your own company you'll work harder than you would if you had an ordinary job. But you will avoid many of the annoying things that come with a job, including a boss telling you what to do.",
            banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*zpczMTex7R3IsysNSyaC7A.jpeg"
        },
        {
            description: "You might have thought I was joking when I said I was going to tell you how to start Google. You might be thinking 'How could we start Google?' But that's effectively what the people who did start Google were thinking before they started it. If you'd told Larry Page and Sergey Brin, the founders of Google, that the company they were about to start would one day be worth over a trillion dollars, their heads would have exploded.",
            banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*zpczMTex7R3IsysNSyaC7A.jpeg"
        }
    ]
    const cards = data.map(({banner, description}) => <BookMarkCard banner={banner} description={description} />)
    return (
        <>
        <NavBar />
        {cards}
        </>
    )
}