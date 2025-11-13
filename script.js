// Vocabulary data
const vocabulary = [
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
];

let currentWords = [];
let currentIndex = 0;
const wordsPerPage = 10;
let viewed = new Set();

document.addEventListener('DOMContentLoaded', () => {
    loadWords();
    document.getElementById('load-more').addEventListener('click', loadWords);
    document.getElementById('reset-progress').addEventListener('click', resetProgress);
    updateProgress();
});

function loadWords() {
    const vocabContainer = document.getElementById('vocab-container');
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + wordsPerPage, vocabulary.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const word = vocabulary[i];
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
                    <div>
                        <h4 class="text-base font-bold text-indigo-800">${word.word}</h4>
                        <span class="text-xs px-1 py-0.5 bg-indigo-200 text-indigo-800 rounded">${word.partOfSpeech}</span>
                    </div>
                    <i data-feather="bookmark" class="text-indigo-500 cursor-pointer hover:text-indigo-700"></i>
                </div>
                <div class="mb-3">
                    <h5 class="font-semibold text-gray-700 mb-1 text-sm">Example</h5>
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
        
        wordElement.addEventListener('click', (e) => handleWordClick(wordElement, word));
        vocabContainer.appendChild(wordElement);
    }
    
    currentIndex = endIndex;
    feather.replace(); // Replace icons after adding new cards
    
    if (currentIndex >= vocabulary.length) {
        document.getElementById('load-more').disabled = true;
        document.getElementById('load-more').classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function handleWordClick(wordElement, word) {
    const isMobile = window.innerWidth < 768;
    const index = parseInt(wordElement.dataset.index);
    
    if (!viewed.has(index)) {
        viewed.add(index);
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
                <div>
                    <h2 class="text-2xl font-bold text-indigo-800">${word.word}</h2>
                    <span class="text-sm px-2 py-1 bg-indigo-200 text-indigo-800 rounded-full">${word.partOfSpeech}</span>
                </div>
                <i data-feather="bookmark" class="text-indigo-500 cursor-pointer hover:text-indigo-700"></i>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-1">Definition</h3>
                <p class="text-gray-800">${word.definition}</p>
            </div>
            
            <div class="mb-4">
                <h3 class="font-semibold text-gray-700 mb-1">Example</h3>
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

function updateProgress() {
    const progress = (viewed.size / vocabulary.length) * 100;
    
    // Update pie chart for desktop
    var progressRing = document.getElementById('progressRing');
    var progressText = document.getElementById('progressText');
    if (progressRing) {
        var circumference = 2 * Math.PI * 54; // 2πr where r=54
        var offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    if (progressText) {
        progressText.textContent = Math.round(progress) + '%';
    }
    
    // Update mobile linear bar
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        const barFill = document.querySelector('.progress-bar-fill');
        if (barFill) {
            barFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(progress) + '%';
        }
    }
}

function resetProgress() {
    viewed.clear();
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
