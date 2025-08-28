import React, { useState, useEffect, useRef } from "react";
import InstagramGrid from "./InstagramGrid";
import InstagramCarousel from "./InstagramCarousel";

interface InstagramPost {
	id: string;
	title: string;
	image: string;
	url: string;
	description?: string | string[];
}

const InstagramFeed: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1200,
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="">
			<div className="lg:container mx-auto px-4">
				<h1 className="text-h3 sm:text-h2 text-[var(--tt-color-text-gray)] w-full text-center mb-[20px]">
					Instagram Feed
				</h1>

				{windowWidth > 650 ? (
					<InstagramGrid posts={posts} />
				) : (
					<InstagramCarousel posts={posts} />
				)}
			</div>
		</div>
	);
};

const InstagramComponent = () => {

	const Posts: InstagramPost[] = [
		{
			id: "1",
			title: "staceysawa",
			image: "/Images/insta/1.jpg",
			url: "https://www.instagram.com/p/DKYqF-PR-1p/",
			description: "My favorite thing to do is to wander around looking for good food places I’ve never heard of and today I found a place I really like. #WaikikiChickeninParadise has no social media I can find and only the beginnings of a Yelp page but I happened to stumble upon it while I was getting my steps in in #Waikiki. They’re right off of Kuhio Avenue in the same area as Five Star Poke, about a block over from Hy’s Steakhouse towards the Zoo end of Kuhio. They’re right off were closed the first time I went by but I noticed this #friedchicken #locomoco on the menu so I knew I was coming back. After my 5 mile trek through the seas of tourists I made the return trip and thankfully they were open. I was super impressed when he handed me the plate. He left it partially open because it was filled and didn’t want to smash everything down. There’s tons of gravy, which I appreciate, a scoop of #macsalad, some #tossedgreens, and a ton of fried #chicken on a bed of rice with a perfectly cooked #egg on top. Old me would’ve questioned the need for the greens but current me appreciated having something healthy in there. I would 100% get this again though I kinda want to try the chicken sandwich next time. Might have to get both 🤔. Highly recommend checking them out. #hawaiifood #CraveHi #hitakesout #hawaiisbestkitchens #yelphawaii",
		},
		{
			id: "2",
			title: "rockstareater",
			image: "/Images/insta/2.gif",
			url: "https://www.instagram.com/reel/DND0lwIpy9E/",
			description: "5 must-try food trucks in Honolulu @angryshrimphawaii @fivestarpoke @thaitacoswaikiki @waikikichickeninparadise located on Kapuni St and Kuhio Ave in Waikiki. Try Hawaiian street food in Waikiki at these 5 food stands. #foodreels #honolulu #waikiki #streetfood #foodtrucks #hawaiianfood",
		},
		{
			id: "3",
			title: "waikikichickeninparadise",
			image: "/Images/insta/3.jpg",
			url: "https://www.instagram.com/p/DNjvMdxIMZG/",
			description: "Fried chicken loco moco- Waikīki comfort on a plate.🌺🍗 . . .  #WaikikiEats #waikiki #hawaiilife #friedchicken #HawaiiFoodie #foodtrailer",
		},
		{
			id: "4",
			title: "onfirehawaii",
			image: "/Images/insta/4.gif",
			url: "https://www.instagram.com/reel/DNq_5i-5L5V/",
			description: "🚨BEST NEW FOOD TRUCKS IN WAIKIKI🌺 The perfect combo: when you no can decide where fo’ go… jus’ go both 🤤🔥  🍛 First stop → Chicken in Paradise: @waikikichickeninparadise da  🍗Chicken Loco Moco stay nuts. Juicy fried chicken  on rice, smothered in gravy, topped wit’ one runny egg = straight up comfort food heaven. Plus they have POG Slushie  🥪If my stomach was mo’ big, I woulda grabbed da Fried Chicken Sando too… Heard das one mean creation 🤯  🌮 Next stop, right Nextdoor → Thai Taco: @thaitacoswaikiki Had to sample the Taco Mix (3) 🥩 Thai grilled beef — smoky, juicy, buss’ yo’ tastebuds 🍢 Chicken satay — peanut sauce slap, no joke 🍗 Crispy chicken — crunch so loud, had tourists turn heads 😂  🧋Thai Iced tea  ✨ Waikiki grindz back-to-back… chicken plate AND tacos? Bruh, das da kine “why choose when you can cruise” combo 🤙  📍 2463 Kūhiō Ave, Waikiki (both trucks, same spot!) 👯‍♂️ Tag da crew fo’ this double mission — cheat day stay worth it.  #WaikikiGrinds #ChickenInParadise #ThaiTacoWaikiki #OnoKineEats #HNLFoodie #IslandVibes #foodtruckfinds @collabhawaii @thecoconutpages",
		},
		{
			id: "5",
			title: "waikikichickeninparadise",
			image: "/Images/insta/5.gif",
			url: "https://www.instagram.com/reel/DNwwlFrUAk-/",
			description: "Loco moco, but make it crispy!!! . . . . #LocoMoco #Fried ChickenLocoMoco #WaikikiEats #WaikikiFood #WaikikiBeachEats #HonoluluEats #HonoluluFoodie #HawaiiFoodie #HawaiiEats #FriedChickenHawai #Chicken Sandwich #WaikikiChicken #ComfortFoodHawai #HawaiiFoodstagram #WaikikiSlushies #MacSaladAndFries #WaikikiRestaurants #HawaiiComfortFood #HonoluluRestaurants #LocalHawaiiEats #WaikikiFoodie #ChickenIn Paradise",
		},
		{
			id: "6",
			title: "thaitacoswaikiki",
			image: "/Images/insta/6.jpg",
			url: "https://www.instagram.com/p/DN19PfN2P5I/",
			description: "Our Beloved Food Trailers~ . . . . . #ThaiTacosWaikiki #friedchickenhonolulu #friedchickenoahu #WaikikiEats #WaikikiFood #WaikikiFoodies #WaikikiBeach #WaikikiBeachEats #WaikikiBeachVibes #WaikikiLife #WaikikiVibes #Honolulu Eats #HonoluluFoodies #HonoluluHawai #HonoluluCatering #HawaiiEats #HawaiiFoodies #HawaiiFood #HawaiCatering #0ahuEats #oahufoodies #oahucatering #EatLocalHawai #SupportLocalHawai",
		},
	];

	return <InstagramFeed posts={Posts} />;
};

export default InstagramComponent;
