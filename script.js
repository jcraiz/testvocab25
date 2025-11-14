// Vocabulary data - split into parts for pagination
const vocabularyParts = [
    // Part 1 (original 10 words)
    [
        {
            word: "Serendipity",
            definition: "The occurrence of events by chance in a happy or beneficial way",
            example: "Finding that rare book at the flea market was pure serendipity.",
            partOfSpeech: "noun",
            synonyms: ["chance", "fortuity", "luck"]
        },
        {
            word: "Ephemeral",
            definition: "Lasting for a very short time",
            example: "The ephemeral beauty of cherry blossoms makes them special.",
            partOfSpeech: "adjective",
            synonyms: ["transient", "fleeting", "momentary"]
        },
        {
            word: "Quintessential",
            definition: "Representing the most perfect or typical example of a quality or class",
            example: "She was the quintessential professional, always prepared and punctual.",
            partOfSpeech: "adjective",
            synonyms: ["archetypal", "classic", "typical"]
        },
        {
            word: "Melancholy",
            definition: "A feeling of pensive sadness, typically with no obvious cause",
            example: "There's a melancholy tone to his poetry that resonates with readers.",
            partOfSpeech: "noun",
            synonyms: ["sadness", "sorrow", "gloom"]
        },
        {
            word: "Ubiquitous",
            definition: "Present, appearing, or found everywhere",
            example: "Mobile phones have become ubiquitous in modern society.",
            partOfSpeech: "adjective",
            synonyms: ["omnipresent", "universal", "pervasive"]
        },
        {
            word: "Eloquent",
            definition: "Fluent or persuasive in speaking or writing",
            example: "Her eloquent speech moved the audience to tears.",
            partOfSpeech: "adjective",
            synonyms: ["articulate", "expressive", "fluent"]
        },
        {
            word: "Resilience",
            definition: "The capacity to recover quickly from difficulties; toughness",
            example: "The community showed remarkable resilience after the natural disaster.",
            partOfSpeech: "noun",
            synonyms: ["toughness", "durability", "strength"]
        },
        {
            word: "Pragmatic",
            definition: "Dealing with things sensibly and realistically",
            example: "His pragmatic approach to problem-solving saved the company money.",
            partOfSpeech: "adjective",
            synonyms: ["practical", "realistic", "sensible"]
        },
        {
            word: "Voracious",
            definition: "Wanting or devouring great quantities of something",
            example: "She's a voracious reader, finishing several books a week.",
            partOfSpeech: "adjective",
            synonyms: ["insatiable", "ravenous", "gluttonous"]
        },
        {
            word: "Meticulous",
            definition: "Showing great attention to detail; very careful and precise",
            example: "The artist was meticulous in every brushstroke of his masterpiece.",
            partOfSpeech: "adjective",
            synonyms: ["careful", "painstaking", "precise"]
        }
    ],
    // Part 2 (new 10 words)
    [
        {
            word: "Ethereal",
            definition: "Extremely delicate, light, and seemingly not of this world",
            example: "The ethereal quality of the morning mist gave the forest an otherworldly appearance.",
            partOfSpeech: "adjective",
            synonyms: ["celestial", "delicate", "gossamer"]
        },
        {
            word: "Nostalgia",
            definition: "A sentimental longing for the past",
            example: "Looking through old photographs filled her with nostalgia for her childhood summers.",
            partOfSpeech: "noun",
            synonyms: ["reminiscence", "wistfulness", "longing"]
        },
        {
            word: "Ineffable",
            definition: "Too great or extreme to be expressed in words",
            example: "The ineffable beauty of the sunset left them speechless.",
            partOfSpeech: "adjective",
            synonyms: ["indescribable", "inexpressible", "unutterable"]
        },
        {
            word: "Tenacity",
            definition: "The quality of being determined and persistent",
            example: "Her tenacity in pursuing her goals inspired everyone around her.",
            partOfSpeech: "noun",
            synonyms: ["persistence", "determination", "perseverance"]
        },
        {
            word: "Nuanced",
            definition: "Characterized by subtle distinctions or variations",
            example: "His nuanced understanding of the issue allowed him to see perspectives others missed.",
            partOfSpeech: "adjective",
            synonyms: ["subtle", "refined", "sophisticated"]
        },
        {
            word: "Whimsical",
            definition: "Playfully quaint or fanciful, especially in an appealing way",
            example: "The artist's whimsical paintings featured floating umbrellas and dancing teacups.",
            partOfSpeech: "adjective",
            synonyms: ["fanciful", "capricious", "playful"]
        },
        {
            word: "Candor",
            definition: "The quality of being open, honest, and straightforward",
            example: "I appreciated his candor when discussing the challenges ahead.",
            partOfSpeech: "noun",
            synonyms: ["frankness", "honesty", "directness"]
        },
        {
            word: "Intrinsic",
            definition: "Belonging naturally or essential to something",
            example: "Creativity is intrinsic to human nature.",
            partOfSpeech: "adjective",
            synonyms: ["inherent", "innate", "fundamental"]
        },
        {
            word: "Ardent",
            definition: "Enthusiastic or passionate",
            example: "She was an ardent supporter of environmental conservation.",
            partOfSpeech: "adjective",
            synonyms: ["passionate", "fervent", "zealous"]
        },
        {
            word: "Paradox",
            definition: "A seemingly contradictory statement that may nonetheless be true",
            example: "It's a paradox that the more choices we have, the less satisfied we often feel.",
            partOfSpeech: "noun",
            synonyms: ["contradiction", "anomaly", "incongruity"]
        }
    ]
];

let currentWords = [];
let currentPart = 0; // Start with Part 1 (index 0)
const wordsPerPart = 10;
const viewedParts = [new Set(), new Set()]; // Separate viewed Sets per part

document.addEventListener('DOMContentLoaded', () => {
    loadPart(currentPart);
    document.getElementById('load-more').addEventListener('click', togglePart);
    document.getElementById('reset-progress').addEventListener('click', resetProgress);
    updateProgress();
    updatePartIndicator();
});

// Load a specific part without clearing its viewed progress
function loadPart(partIndex) {
    const vocabContainer = document.getElementById('vocab-container');
    vocabContainer.innerHTML = ''; // Clear previous words
    currentWords = [];
    
    const currentVocab = vocabularyParts[partIndex];
    
    for (let i = 0; i < currentVocab.length; i++) {
        const word = currentVocab[i];
        currentWords.push(word);
        
        const wordElement = document.createElement('div');
        wordElement.className = 'vocab-card bg-white p-4 rounded-lg shadow cursor-pointer border border-gray-100';
        wordElement.dataset.index = i.toString();
        wordElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-lg text-indigo-700">${word.word}</h3>
                <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">${word.partOfSpeech}</span>
            </div>
            <p class="text-gray-600">${word.definition}</p>
            <div class="details hidden mt-4 p-3 bg-indigo-50 rounded-lg">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center">
                        <h4 class="text-base font-bold text-indigo-800">${word.word}</h4>
                        <i class="fas fa-volume-up sound-icon" onclick="playWord('${word.word}')"></i>
                    </div>
                    <span class="text-xs px-1 py-0.5 bg-indigo-200 text-indigo-800 rounded">${word.partOfSpeech}</span>
                </div>
                <div class="mb-3">
                    <h5 class="font-semibold text-gray-700 mb-1 text-sm flex items-center">Example <i class="fas fa-volume-up sound-icon ml-2" onclick="playExample('${word.word}')"></i></h5>
                    <p class="text-gray-800 text-sm italic">"${word.example}"</p>
                </div>
                <div class="mb-2">
                    <h5 class="font-semibold text-gray-700 mb-1 text-sm">Synonyms</h5>
                    <div class="flex flex-wrap gap-1">
                        ${word.synonyms.map(syn => `<span class="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded-full">${syn}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        wordElement.addEventListener('click', (e) => {
            // Prevent audio play on card click
            if (e.target.classList.contains('sound-icon')) return;
            handleWordClick(wordElement, word);
        });
        vocabContainer.appendChild(wordElement);
    }
    
    feather.replace(); // Replace icons after adding new cards
    updateProgress(); // Update after loading
}

// Toggle between parts
function togglePart() {
    currentPart = (currentPart + 1) % vocabularyParts.length;
    loadPart(currentPart);
    updatePartIndicator();
    // Update button text for toggle feel
    const button = document.getElementById('load-more');
    button.textContent = currentPart === 0 ? 'Load More Words' : 'Back to Part 1';
}

// Update part indicator text
function updatePartIndicator() {
    const indicator = document.getElementById('part-indicator');
    indicator.textContent = `Part ${currentPart + 1} of ${vocabularyParts.length}`;
}

function handleWordClick(wordElement, word) {
    const isMobile = window.innerWidth < 768;
    const index = parseInt(wordElement.dataset.index);
    const currentViewed = viewedParts[currentPart];
    
    if (!currentViewed.has(index)) {
        currentViewed.add(index);
        updateProgress();
    }
    
    if (isMobile) {
        const details = wordElement.querySelector('.details');
        if (details) {
            const isHidden = details.classList.contains('hidden');
            if (isHidden) {
                details.classList.remove('hidden');
                wordElement.classList.add('expanded');
            } else {
                details.classList.add('hidden');
                wordElement.classList.remove('expanded');
            }
        }
    } else {
        showWordDetails(word);
    }
}

function showWordDetails(word) {
    const detailsContainer = document.getElementById('word-details');
    detailsContainer.innerHTML = `
        <div class="word-detail-card w-full bg-indigo-50 rounded-lg p-6">
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center">
                    <h2 class="text-2xl font-bold text-indigo-800">${word.word}</h2>
                    <i class="fas fa-volume-up sound-icon" onclick="playWord('${word.word}')"></i>
                </div>
                <span class="text-sm px-2 py-1 bg-indigo-200 text-indigo-800 rounded-full">${word.partOfSpeech}</span>
                <i data-feather="bookmark" class="text-indigo-500 cursor-pointer hover:text-indigo-700"></i>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-1">Definition</h3>
                <p class="text-gray-800">${word.definition}</p>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-1 flex items-center">Example <i class="fas fa-volume-up sound-icon ml-2" onclick="playExample('${word.word}')"></i></h3>
                <p class="text-gray-800 italic">"${word.example}"</p>
            </div>
            
            <div>
                <h3 class="font-semibold text-gray-700 mb-1">Synonyms</h3>
                <div class="flex flex-wrap gap-2">
                    ${word.synonyms.map(syn => `<span class="text-sm px-2 py-1 bg-gray-200 text-gray-800 rounded-full">${syn}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    feather.replace();
}

// Audio playback functions
function playWord(word) {
    const audio = new Audio(`sound/${word.toLowerCase()}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
}

function playExample(word) {
    const audio = new Audio(`sound/ex_${word.toLowerCase()}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
}

function updateProgress() {
    const currentVocab = vocabularyParts[currentPart];
    const currentViewed = viewedParts[currentPart];
    const progress = (currentViewed.size / currentVocab.length) * 100;
    
    // Desktop circle update
    const desktopText = document.getElementById('desktopProgressText');
    if (desktopText) {
        desktopText.textContent = Math.round(progress) + '%';
    }
    const progressRing = document.getElementById('progressRing');
    if (progressRing) {
        const circumference = 2 * Math.PI * 54; // 2πr where r=54
        const offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    
    // Mobile bar update
    const mobileText = document.getElementById('mobileProgressText');
    if (mobileText) {
        mobileText.textContent = Math.round(progress) + '%';
    }
    const barFill = document.getElementById('progressBarFill');
    if (barFill) {
        barFill.style.width = progress + '%';
    }
}

function resetProgress() {
    viewedParts[currentPart].clear();
    updateProgress();
    
    // Close all expanded details on mobile
    document.querySelectorAll('.details').forEach(d => d.classList.add('hidden'));
    document.querySelectorAll('.vocab-card').forEach(c => c.classList.remove('expanded'));
    
    // Clear desktop details
    const detailsContainer = document.getElementById('word-details');
    if (detailsContainer) {
        detailsContainer.innerHTML = `<p class="text-gray-500">Select a word to see its details</p>`;
    }
}
