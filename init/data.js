const sampleListings = [
  {
    title: "Sea Breeze Villa",
    description: "Beautiful beachfront villa with stunning sea views.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
      filename: "sea-breeze-villa"
    },
    price: 4500,
    location: "Goa",
    country: "India",
    geometry: { type: "Point", coordinates: [73.8567, 15.2993] },
    category: ["Beach", "Trending"]
  },
  {
    title: "Mountain Escape Cabin",
    description: "Cozy wooden cabin nestled in the mountains.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
      filename: "mountain-cabin"
    },
    price: 3200,
    location: "Manali",
    country: "India",
    geometry: { type: "Point", coordinates: [77.1892, 32.2396] },
    category: ["Mountains", "Camping"]
  },
  {
    title: "Urban Studio Apartment",
    description: "Modern studio in the heart of the city.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
      filename: "urban-studio"
    },
    price: 2800,
    location: "Bangalore",
    country: "India",
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
    category: ["Iconic Cities", "Rooms"]
  },
  {
    title: "Royal Heritage Castle",
    description: "Live like royalty in this restored heritage castle.",
    image: {
      url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60",
      filename: "heritage-castle"
    },
    price: 12000,
    location: "Jaipur",
    country: "India",
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
    category: ["Castles", "Iconic Cities"]
  },
  {
    title: "Infinity Pool Retreat",
    description: "Luxury stay with a private infinity pool.",
    image: {
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60",
        filename: "infinity-pool-retreat"
    },
    price: 9800,
    location: "Udaipur",
    country: "India",
    geometry: { type: "Point", coordinates: [73.7125, 24.5854] },
    category: ["Amazing Pools", "Trending"]
  },

  {
    title: "Forest Camping Tent",
    description: "Reconnect with nature in this forest campsite.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "forest-camp"
    },
    price: 1800,
    location: "Coorg",
    country: "India",
    geometry: { type: "Point", coordinates: [75.8069, 12.3375] },
    category: ["Camping", "Farms"]
  },
  {
    title: "Snow Dome Igloo",
    description: "Experience Arctic living in a cozy igloo.",
    image: {
      url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60",
      filename: "snow-igloo"
    },
    price: 15000,
    location: "Rovaniemi",
    country: "Finland",
    geometry: { type: "Point", coordinates: [25.7294, 66.5039] },
    category: ["Arctic", "Trending"]
  },
  {
    title: "Lake View Farmhouse",
    description: "Peaceful farmhouse overlooking a lake.",
    image: {
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
      filename: "lake-farmhouse"
    },
    price: 3600,
    location: "Alleppey",
    country: "India",
    geometry: { type: "Point", coordinates: [76.3388, 9.4981] },
    category: ["Farms", "Trending"]
  },
  {
    title: "Desert Star Camp",
    description: "Luxury tents under the desert stars.",
    image: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
      filename: "desert-star-camp"
    },
    price: 5200,
    location: "Jaisalmer",
    country: "India",
    geometry: { type: "Point", coordinates: [70.9083, 26.9157] },
    category: ["Camping"]
  },
  {
    title: "Hilltop Glass House",
    description: "Panoramic views from a modern glass house.",
    image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
      filename: "glass-house"
    },
    price: 7000,
    location: "Ooty",
    country: "India",
    geometry: { type: "Point", coordinates: [76.6950, 11.4064] },
    category: ["Mountains", "Amazing Pools"]
  },

  // ---- remaining to reach 30 ----

  {
    title: "Luxury City Penthouse",
    description: "High-rise penthouse with skyline views.",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
      filename: "city-penthouse"
    },
    price: 11000,
    location: "Mumbai",
    country: "India",
    geometry: { type: "Point", coordinates: [72.8777, 19.0760] },
    category: ["Iconic Cities", "Rooms"]
  },
  {
    title: "Tea Estate Bungalow",
    description: "Stay amid lush tea plantations.",
    image: {
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=60",
      filename: "tea-estate-bungalow"
    },
    price: 3800,
    location: "Munnar",
    country: "India",
    geometry: { type: "Point", coordinates: [77.0620, 10.0889] },
    category: ["Mountains", "Farms"]
  },
  {
    title: "Palm Grove Cottage",
    description: "Relax in a quiet palm grove.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "palm-grove"
    },
    price: 2600,
    location: "Varkala",
    country: "India",
    geometry: { type: "Point", coordinates: [76.7163, 8.7379] },
    category: ["Beach"]
  },
  {
    title: "Jungle Treehouse",
    description: "Live above the forest floor.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
      filename: "treehouse"
    },
    price: 6000,
    location: "Wayanad",
    country: "India",
    geometry: { type: "Point", coordinates: [76.1320, 11.6854] },
    category: ["Camping", "Trending"]
  }
];

module.exports = sampleListings;
