![Banner](lib/banner-last.png)
## The Last Dance??? no, no, The LAST DECISION
Play it here: [http://last-decision.vercel.app/](http://last-decision.vercel.app/)

The AI asks you questions. You configure the country. You decide who gets in and who doesn't. It keeps telling you it knows what's optimal. You start to wonder if that's the same thing as what's right, or maybe AI is tricking you actually.


#### What it actually is

A short browser prototype built for a hackathon. No accounts, no saving, no backend, you open it, play through it, and choose to trust the AI or don't.

It runs in three parts: 
1. Questions: The AI fires off yes/no questions. Answer correctly and you score points. Some questions are "targeted" and just cost you points no matter what you pick
2. Decide: People show up one at a time with a case file and an AI recommendation. You accept or reject them. The AI's recommendation is not always the right call, and you don't find out until after you've already chosen.
3. Wait

At the end you get a score and a "treasury," and you can go again. There's no win screen. That's on purpose.

#### Runnign it locally!
```bash
npm install
npm run dev
```

Then open localhost:3000 and enjoy!!

Built with Next.js
