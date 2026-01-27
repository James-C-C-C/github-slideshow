/**
 * MedPub - Data Management Module
 * Handles article storage, retrieval, and sample data
 */

// Sample medical articles data
const sampleArticles = [
    {
        id: 1,
        title: "Advances in mRNA Vaccine Technology: Lessons from COVID-19",
        subtitle: "How the pandemic accelerated vaccine development and what it means for future therapies",
        category: "infectious-disease",
        type: "research",
        author: {
            name: "Dr. Sarah Chen",
            title: "MD, PhD, Immunologist",
            affiliation: "Stanford University School of Medicine",
            bio: "Dr. Chen is a leading researcher in vaccine immunology with over 15 years of experience in infectious disease research. Her work has been instrumental in understanding T-cell responses to novel pathogens."
        },
        date: "2026-01-15",
        readingTime: 12,
        likes: 847,
        comments: [
            {
                id: 1,
                name: "Dr. James Wilson",
                title: "MD, Infectious Disease Specialist",
                text: "Excellent overview of the mRNA platform. I'd be interested to see more discussion on the thermostability challenges and how they're being addressed for global distribution.",
                date: "2026-01-16",
                likes: 23
            },
            {
                id: 2,
                name: "Emma Rodriguez, RN",
                title: "BSN, Vaccine Coordinator",
                text: "This is incredibly helpful for explaining the science to patients who have questions about how these vaccines work. Thank you for making it accessible!",
                date: "2026-01-17",
                likes: 15
            }
        ],
        tags: ["vaccines", "mRNA", "COVID-19", "immunology", "biotechnology"],
        excerpt: "The rapid development of mRNA vaccines during the COVID-19 pandemic represents a watershed moment in medical history. This article examines the underlying technology, clinical outcomes, and implications for treating other diseases.",
        content: `
            <p>The rapid development of mRNA vaccines during the COVID-19 pandemic represents a watershed moment in medical history. In less than a year, researchers achieved what previously took decades, fundamentally changing our approach to vaccine development and opening new possibilities for treating a wide range of diseases.</p>

            <h2>The Science Behind mRNA Vaccines</h2>
            <p>Messenger RNA (mRNA) vaccines work by introducing a piece of genetic code that instructs cells to produce a specific protein—in the case of COVID-19 vaccines, the spike protein found on the surface of the SARS-CoV-2 virus. This triggers an immune response without exposing the body to the actual pathogen.</p>

            <p>Unlike traditional vaccines that use weakened or inactivated viruses, mRNA vaccines never introduce any viral material. The mRNA itself degrades within days, leaving behind only the immune memory necessary for protection.</p>

            <blockquote>
                "The success of mRNA vaccines against COVID-19 has validated decades of research and opened the door to applications we once thought were years away." — Dr. Katalin Karikó, Nobel Laureate
            </blockquote>

            <h2>Clinical Outcomes and Real-World Effectiveness</h2>
            <p>Clinical trials demonstrated efficacy rates exceeding 90% for the primary mRNA vaccines, with real-world data confirming substantial protection against severe disease, hospitalization, and death. Key findings include:</p>

            <ul>
                <li>95% efficacy against symptomatic COVID-19 in initial trials</li>
                <li>Significant reduction in transmission rates in vaccinated populations</li>
                <li>Durable immune responses persisting beyond initial expectations</li>
                <li>Adaptability to emerging variants through updated formulations</li>
            </ul>

            <h2>Beyond COVID-19: Future Applications</h2>
            <p>The infrastructure and knowledge gained from COVID-19 vaccine development are now being applied to other medical challenges:</p>

            <h3>Cancer Immunotherapy</h3>
            <p>Personalized mRNA cancer vaccines that train the immune system to recognize tumor-specific antigens are showing promising results in clinical trials for melanoma, pancreatic cancer, and other malignancies.</p>

            <h3>Infectious Diseases</h3>
            <p>mRNA platforms are being developed for influenza, HIV, respiratory syncytial virus (RSV), and Zika virus, with several candidates in advanced clinical trials.</p>

            <h3>Rare Genetic Diseases</h3>
            <p>mRNA therapies are being explored as a way to replace defective proteins in conditions like cystic fibrosis and certain metabolic disorders.</p>

            <h2>Challenges and Considerations</h2>
            <p>Despite remarkable progress, several challenges remain:</p>

            <ul>
                <li><strong>Cold chain requirements:</strong> Current mRNA vaccines require ultra-cold storage, limiting distribution in resource-limited settings</li>
                <li><strong>Manufacturing scale:</strong> Meeting global demand requires continued expansion of production capacity</li>
                <li><strong>Immune response variability:</strong> Understanding why some individuals mount weaker responses remains an active area of research</li>
                <li><strong>Long-term safety monitoring:</strong> Continued pharmacovigilance is essential as more populations receive mRNA-based products</li>
            </ul>

            <h2>Conclusion</h2>
            <p>The COVID-19 pandemic, despite its devastating toll, has catalyzed a revolution in vaccine technology. The mRNA platform has proven its worth and is poised to transform medicine across multiple therapeutic areas. As we continue to refine these technologies, the lessons learned will guide development of the next generation of preventive and therapeutic interventions.</p>
        `,
        featured: true
    },
    {
        id: 2,
        title: "Heart Failure Management in 2026: Guideline Updates and Emerging Therapies",
        subtitle: "A comprehensive review of current evidence and clinical recommendations",
        category: "cardiology",
        type: "review",
        author: {
            name: "Dr. Michael Thompson",
            title: "MD, FACC, Cardiologist",
            affiliation: "Cleveland Clinic",
            bio: "Dr. Thompson is a board-certified cardiologist specializing in heart failure and cardiac transplantation. He has published over 100 peer-reviewed articles and serves on multiple guideline committees."
        },
        date: "2026-01-10",
        readingTime: 15,
        likes: 623,
        comments: [
            {
                id: 1,
                name: "Dr. Patricia Lee",
                title: "MD, Internal Medicine",
                text: "Very helpful synthesis of the new guidelines. The section on SGLT2 inhibitors is particularly relevant for my practice.",
                date: "2026-01-11",
                likes: 18
            }
        ],
        tags: ["heart failure", "cardiology", "SGLT2 inhibitors", "guidelines", "treatment"],
        excerpt: "Heart failure affects over 64 million people worldwide. Recent guideline updates and novel therapeutic agents have significantly changed the treatment landscape. This review synthesizes current evidence and practical recommendations.",
        content: `
            <p>Heart failure affects over 64 million people worldwide and remains a leading cause of hospitalization and mortality. Recent years have seen significant advances in our understanding of pathophysiology and the introduction of novel therapeutic agents that have fundamentally changed the treatment paradigm.</p>

            <h2>Updated Classification and Staging</h2>
            <p>The 2025 ACC/AHA guidelines introduced refined staging criteria that better reflect disease progression and prognosis. Heart failure is now classified into four stages (A through D) with specific therapeutic recommendations for each:</p>

            <ul>
                <li><strong>Stage A:</strong> At risk for HF but without structural disease or symptoms</li>
                <li><strong>Stage B:</strong> Structural disease without signs or symptoms of HF</li>
                <li><strong>Stage C:</strong> Structural disease with prior or current symptoms</li>
                <li><strong>Stage D:</strong> Refractory HF requiring specialized interventions</li>
            </ul>

            <h2>Foundational Pharmacotherapy</h2>
            <p>Guideline-directed medical therapy (GDMT) for HF with reduced ejection fraction (HFrEF) now includes four foundational drug classes, often referred to as the "four pillars":</p>

            <h3>1. SGLT2 Inhibitors</h3>
            <p>Sodium-glucose cotransporter 2 inhibitors have emerged as essential therapy regardless of diabetes status. Trials including DAPA-HF and EMPEROR-Reduced demonstrated significant reductions in cardiovascular death and HF hospitalization.</p>

            <h3>2. Angiotensin Receptor-Neprilysin Inhibitors (ARNI)</h3>
            <p>Sacubitril/valsartan has largely replaced ACE inhibitors as first-line therapy based on the PARADIGM-HF trial showing superior outcomes.</p>

            <h3>3. Beta-Blockers</h3>
            <p>Evidence-based beta-blockers (carvedilol, bisoprolol, metoprolol succinate) remain cornerstone therapy with proven mortality benefits.</p>

            <h3>4. Mineralocorticoid Receptor Antagonists</h3>
            <p>Spironolactone or eplerenone should be prescribed in all eligible patients with HFrEF.</p>

            <h2>Emerging Therapies</h2>
            <p>Several novel agents are showing promise in clinical trials and may soon expand our therapeutic arsenal:</p>

            <ul>
                <li>Cardiac myosin activators for improving contractility</li>
                <li>Gene therapies targeting specific cardiomyopathies</li>
                <li>Next-generation devices for mechanical circulatory support</li>
            </ul>

            <h2>Practical Considerations</h2>
            <p>Implementing GDMT requires careful attention to titration schedules, monitoring for adverse effects, and addressing barriers to medication adherence. A systematic approach to up-titration, often using dedicated HF clinics or pharmacist-led programs, improves outcomes.</p>
        `,
        featured: false
    },
    {
        id: 3,
        title: "Artificial Intelligence in Diagnostic Radiology: Current Applications and Limitations",
        subtitle: "Evaluating AI's role in medical imaging and its impact on clinical practice",
        category: "research",
        type: "article",
        author: {
            name: "Dr. Robert Kim",
            title: "MD, Diagnostic Radiologist",
            affiliation: "Massachusetts General Hospital",
            bio: "Dr. Kim specializes in AI applications in medical imaging and leads the hospital's machine learning initiatives in radiology."
        },
        date: "2026-01-08",
        readingTime: 10,
        likes: 512,
        comments: [],
        tags: ["AI", "radiology", "machine learning", "diagnostics", "imaging"],
        excerpt: "Artificial intelligence is transforming diagnostic radiology, offering tools for faster and more accurate image interpretation. This article examines real-world applications, validation challenges, and the evolving role of radiologists.",
        content: `
            <p>Artificial intelligence, particularly deep learning algorithms, has made remarkable inroads into diagnostic radiology. From detecting lung nodules to identifying diabetic retinopathy, AI tools are increasingly being integrated into clinical workflows. Understanding both their capabilities and limitations is essential for appropriate implementation.</p>

            <h2>Current FDA-Cleared Applications</h2>
            <p>Over 500 AI algorithms have received FDA clearance for medical imaging applications. Key areas include:</p>

            <ul>
                <li>Chest X-ray triage and pathology detection</li>
                <li>Mammography screening augmentation</li>
                <li>CT stroke detection and quantification</li>
                <li>Cardiac MRI analysis</li>
                <li>Bone age assessment</li>
            </ul>

            <h2>Performance Metrics and Validation</h2>
            <p>While headline accuracy figures are often impressive, critical evaluation requires understanding of:</p>

            <ul>
                <li>Training data composition and potential biases</li>
                <li>External validation across diverse populations</li>
                <li>Performance in real-world clinical settings vs. curated datasets</li>
                <li>Impact on downstream clinical decisions</li>
            </ul>

            <h2>The Evolving Role of Radiologists</h2>
            <p>Rather than replacing radiologists, AI tools are increasingly positioned as decision support systems. The most effective implementations leverage AI for initial screening and quantification while preserving radiologist oversight for complex interpretation and clinical integration.</p>
        `,
        featured: false
    },
    {
        id: 4,
        title: "Pediatric Mental Health Crisis: Assessment and Intervention Strategies",
        subtitle: "Addressing the surge in childhood anxiety and depression post-pandemic",
        category: "pediatrics",
        type: "article",
        author: {
            name: "Dr. Amanda Foster",
            title: "MD, Child Psychiatrist",
            affiliation: "Children's Hospital of Philadelphia",
            bio: "Dr. Foster is a leading expert in pediatric mental health with a focus on anxiety disorders and trauma-informed care."
        },
        date: "2026-01-05",
        readingTime: 8,
        likes: 438,
        comments: [
            {
                id: 1,
                name: "Dr. Kevin O'Brien",
                title: "MD, Pediatrician",
                text: "This is essential reading for all pediatric providers. The screening recommendations are especially helpful.",
                date: "2026-01-06",
                likes: 12
            },
            {
                id: 2,
                name: "Sarah Mitchell, LCSW",
                title: "School Social Worker",
                text: "Thank you for highlighting school-based interventions. We need more resources and support in educational settings.",
                date: "2026-01-07",
                likes: 8
            }
        ],
        tags: ["pediatrics", "mental health", "anxiety", "depression", "screening"],
        excerpt: "Rates of anxiety, depression, and suicidal ideation among children and adolescents have reached unprecedented levels. This article provides evidence-based strategies for identification and early intervention.",
        content: `
            <p>The mental health of children and adolescents has emerged as a critical public health concern. Emergency department visits for mental health crises have increased by over 50% since 2019, with particular increases in anxiety, depression, and self-harm among young people.</p>

            <h2>Epidemiology and Risk Factors</h2>
            <p>Understanding the scope of the problem is essential for developing appropriate responses:</p>

            <ul>
                <li>Approximately 1 in 5 children now meets criteria for a mental health disorder</li>
                <li>Rates of major depressive episodes have doubled among adolescents in the past decade</li>
                <li>Social media use, academic pressure, and pandemic-related disruptions are key contributing factors</li>
            </ul>

            <h2>Screening Recommendations</h2>
            <p>Universal screening in pediatric settings is now recommended starting at age 12. Validated tools include the PHQ-A for depression and the GAD-7 for anxiety.</p>

            <h2>Evidence-Based Interventions</h2>
            <p>First-line treatments for pediatric anxiety and depression include:</p>

            <ul>
                <li>Cognitive behavioral therapy (CBT)</li>
                <li>Family-based interventions</li>
                <li>School-based prevention programs</li>
                <li>Selective serotonin reuptake inhibitors (SSRIs) for moderate-severe cases</li>
            </ul>

            <h2>Building Resilient Systems</h2>
            <p>Addressing the pediatric mental health crisis requires coordinated action across healthcare, education, and community settings. Integration of behavioral health into primary care and expansion of telehealth services are promising strategies for improving access.</p>
        `,
        featured: false
    },
    {
        id: 5,
        title: "Targeted Therapies in Non-Small Cell Lung Cancer: A Practical Guide",
        subtitle: "Navigating molecular testing and treatment selection in the era of precision oncology",
        category: "oncology",
        type: "review",
        author: {
            name: "Dr. Jennifer Walsh",
            title: "MD, Medical Oncologist",
            affiliation: "Memorial Sloan Kettering Cancer Center",
            bio: "Dr. Walsh specializes in thoracic malignancies and has led multiple clinical trials evaluating targeted therapies and immunotherapy combinations."
        },
        date: "2026-01-02",
        readingTime: 14,
        likes: 389,
        comments: [],
        tags: ["oncology", "lung cancer", "targeted therapy", "biomarkers", "precision medicine"],
        excerpt: "Molecular profiling has revolutionized treatment of non-small cell lung cancer. This guide reviews actionable mutations, approved therapies, and strategies for sequencing treatments based on tumor genomics.",
        content: `
            <p>Non-small cell lung cancer (NSCLC) treatment has been transformed by the identification of actionable oncogenic driver mutations and the development of targeted therapies. Comprehensive molecular profiling is now essential for all patients with advanced disease.</p>

            <h2>Essential Molecular Testing</h2>
            <p>Current guidelines recommend testing for the following alterations at minimum:</p>

            <ul>
                <li>EGFR mutations (including exon 19 deletions, L858R, exon 20 insertions)</li>
                <li>ALK rearrangements</li>
                <li>ROS1 rearrangements</li>
                <li>BRAF V600E mutations</li>
                <li>NTRK fusions</li>
                <li>MET exon 14 skipping mutations</li>
                <li>RET fusions</li>
                <li>KRAS G12C mutations</li>
            </ul>

            <h2>First-Line Targeted Therapy Selection</h2>
            <p>When an actionable mutation is identified, targeted therapy typically provides superior outcomes compared to chemotherapy or immunotherapy alone. Key considerations include selecting the most effective agent and anticipating resistance mechanisms.</p>

            <h2>Managing Resistance</h2>
            <p>Most patients eventually develop resistance to targeted therapies. Repeat molecular testing at progression is essential for identifying resistance mechanisms and guiding subsequent therapy selection.</p>
        `,
        featured: false
    },
    {
        id: 6,
        title: "Understanding the Gut-Brain Axis: Implications for Neurological Disease",
        subtitle: "How the microbiome influences brain health and neurodegenerative conditions",
        category: "neurology",
        type: "research",
        author: {
            name: "Dr. David Park",
            title: "MD, PhD, Neurologist",
            affiliation: "Johns Hopkins University School of Medicine",
            bio: "Dr. Park researches the connections between gut microbiota and neurological diseases, with particular focus on Parkinson's disease."
        },
        date: "2025-12-28",
        readingTime: 11,
        likes: 567,
        comments: [
            {
                id: 1,
                name: "Dr. Rachel Green",
                title: "PhD, Microbiome Researcher",
                text: "Fascinating review! The bidirectional communication pathways are becoming clearer. Looking forward to seeing translational applications.",
                date: "2025-12-29",
                likes: 19
            }
        ],
        tags: ["neurology", "microbiome", "gut-brain axis", "Parkinson's disease", "research"],
        excerpt: "Emerging research reveals complex bidirectional communication between the gut microbiome and the central nervous system. This article explores the implications for understanding and treating neurological diseases.",
        content: `
            <p>The gut-brain axis represents one of the most exciting frontiers in neuroscience research. Evidence increasingly suggests that the trillions of microorganisms residing in our gastrointestinal tract play a significant role in brain function and may contribute to the development or progression of neurological diseases.</p>

            <h2>Mechanisms of Communication</h2>
            <p>The gut and brain communicate through multiple pathways:</p>

            <ul>
                <li>Vagus nerve signaling</li>
                <li>Immune system modulation</li>
                <li>Microbial metabolites (short-chain fatty acids, neurotransmitters)</li>
                <li>Enteric nervous system interactions</li>
            </ul>

            <h2>Implications for Neurodegenerative Disease</h2>
            <p>Alterations in gut microbiome composition have been documented in multiple neurological conditions including Parkinson's disease, Alzheimer's disease, and multiple sclerosis. Whether these changes are causative or consequential remains an active area of investigation.</p>

            <h2>Therapeutic Potential</h2>
            <p>Modulation of the gut microbiome through diet, probiotics, or fecal microbiota transplantation represents a potential therapeutic avenue. Early clinical trials are exploring these interventions in neurological populations.</p>
        `,
        featured: false
    }
];

/**
 * Data Management Class
 */
class DataManager {
    constructor() {
        this.storageKey = 'medpub_articles';
        this.commentsKey = 'medpub_comments';
        this.likesKey = 'medpub_likes';
        this.bookmarksKey = 'medpub_bookmarks';
        this.initializeData();
    }

    initializeData() {
        // Initialize articles if not present
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(sampleArticles));
        }

        // Initialize other data stores
        if (!localStorage.getItem(this.likesKey)) {
            localStorage.setItem(this.likesKey, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.bookmarksKey)) {
            localStorage.setItem(this.bookmarksKey, JSON.stringify([]));
        }
    }

    // Get all articles
    getArticles() {
        const articles = localStorage.getItem(this.storageKey);
        return articles ? JSON.parse(articles) : sampleArticles;
    }

    // Get article by ID
    getArticle(id) {
        const articles = this.getArticles();
        return articles.find(article => article.id === parseInt(id));
    }

    // Get featured article
    getFeaturedArticle() {
        const articles = this.getArticles();
        return articles.find(article => article.featured) || articles[0];
    }

    // Get articles by category
    getArticlesByCategory(category) {
        const articles = this.getArticles();
        if (category === 'all') return articles;
        return articles.filter(article => article.category === category);
    }

    // Sort articles
    sortArticles(articles, sortBy) {
        const sorted = [...articles];
        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'popular':
                return sorted.sort((a, b) => b.likes - a.likes);
            default:
                return sorted;
        }
    }

    // Add new article
    addArticle(article) {
        const articles = this.getArticles();
        const newId = Math.max(...articles.map(a => a.id)) + 1;
        const newArticle = {
            ...article,
            id: newId,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            comments: [],
            featured: false
        };
        articles.unshift(newArticle);
        localStorage.setItem(this.storageKey, JSON.stringify(articles));
        return newArticle;
    }

    // Add comment to article
    addComment(articleId, comment) {
        const articles = this.getArticles();
        const article = articles.find(a => a.id === parseInt(articleId));
        if (article) {
            const newComment = {
                id: Date.now(),
                ...comment,
                date: new Date().toISOString().split('T')[0],
                likes: 0
            };
            article.comments.push(newComment);
            localStorage.setItem(this.storageKey, JSON.stringify(articles));
            return newComment;
        }
        return null;
    }

    // Toggle like on article
    toggleLike(articleId) {
        const likes = JSON.parse(localStorage.getItem(this.likesKey));
        const articles = this.getArticles();
        const article = articles.find(a => a.id === parseInt(articleId));

        if (article) {
            if (likes[articleId]) {
                delete likes[articleId];
                article.likes--;
            } else {
                likes[articleId] = true;
                article.likes++;
            }
            localStorage.setItem(this.likesKey, JSON.stringify(likes));
            localStorage.setItem(this.storageKey, JSON.stringify(articles));
            return { liked: likes[articleId], count: article.likes };
        }
        return null;
    }

    // Check if article is liked
    isLiked(articleId) {
        const likes = JSON.parse(localStorage.getItem(this.likesKey));
        return !!likes[articleId];
    }

    // Toggle bookmark
    toggleBookmark(articleId) {
        let bookmarks = JSON.parse(localStorage.getItem(this.bookmarksKey));
        const index = bookmarks.indexOf(parseInt(articleId));

        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(parseInt(articleId));
        }
        localStorage.setItem(this.bookmarksKey, JSON.stringify(bookmarks));
        return index === -1;
    }

    // Check if article is bookmarked
    isBookmarked(articleId) {
        const bookmarks = JSON.parse(localStorage.getItem(this.bookmarksKey));
        return bookmarks.includes(parseInt(articleId));
    }

    // Get related articles
    getRelatedArticles(articleId, limit = 3) {
        const articles = this.getArticles();
        const currentArticle = articles.find(a => a.id === parseInt(articleId));

        if (!currentArticle) return [];

        return articles
            .filter(a => a.id !== parseInt(articleId) && a.category === currentArticle.category)
            .slice(0, limit);
    }

    // Search articles
    searchArticles(query) {
        const articles = this.getArticles();
        const lowerQuery = query.toLowerCase();

        return articles.filter(article =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            article.author.name.toLowerCase().includes(lowerQuery)
        );
    }

    // Reset to sample data
    resetData() {
        localStorage.setItem(this.storageKey, JSON.stringify(sampleArticles));
        localStorage.setItem(this.likesKey, JSON.stringify({}));
        localStorage.setItem(this.bookmarksKey, JSON.stringify([]));
    }
}

// Create global instance
const dataManager = new DataManager();

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getCategoryLabel(category) {
    const labels = {
        'cardiology': 'Cardiology',
        'neurology': 'Neurology',
        'oncology': 'Oncology',
        'infectious-disease': 'Infectious Disease',
        'pediatrics': 'Pediatrics',
        'research': 'Clinical Research',
        'general': 'General Medicine'
    };
    return labels[category] || category;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}
