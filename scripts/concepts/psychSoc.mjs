import { MCAT_SECTIONS } from "../../js/demoData.js";

function mk(si, topic, subtopic, stems, correct, distractors, wrongExps, explanation, takeaway, trap, related = [], formulas = []) {
  return { section: MCAT_SECTIONS[si], topic, subtopic, stems, correct, distractors, wrong_explanations: wrongExps, explanation, takeaway, trap, related, formulas };
}

export const psychSocConcepts = [

mk(3, "Learning", "Higher-Order Conditioning",
  [
    "A dog has been trained so that a bell (CS) reliably produces salivation. A researcher now repeatedly pairs a light with the bell, without any food. The dog begins to salivate to the light alone. What process explains this?",
    "In an experiment, a tone paired with shock produces fear. The tone is then paired with a green light. Eventually the light alone elicits fear. Which term describes the role of the tone in the second phase?",
    "A child conditioned to fear white coats (CS) later shows fear when shown a hospital sign paired with white coats. What learning principle is demonstrated?",
  ],
  "Higher-order conditioning occurs when an established CS is used as if it were a US to condition a new neutral stimulus, creating a second-order conditioned response without direct pairing with the original US.",
  [
    "Stimulus generalization, in which the conditioned response spreads to stimuli physically similar to the original CS.",
    "Sensory preconditioning, in which two neutral stimuli are paired before either is conditioned, allowing both to later elicit the CR.",
    "Extinction, in which the CS is presented repeatedly without the US, causing the CR to diminish.",
  ],
  [
    "Stimulus generalization requires physical resemblance between stimuli and does not involve using an established CS as a surrogate US.",
    "Sensory preconditioning pairs two neutral stimuli before conditioning begins, whereas higher-order conditioning uses an already-established CS as the surrogate US.",
    "Extinction involves presenting the CS without the US until the CR disappears; here a new CR is being acquired, not eliminated.",
  ],
  "Higher-order (second-order) conditioning extends classical conditioning by using an already-conditioned CS as a functional US to condition a new neutral stimulus. The original US is never presented in the second phase. This process underlies the development of complex fears and preferences far removed from the original aversive or appetitive event.",
  "A trained CS can act as a US to condition new stimuli — no original US required in the second phase.",
  "Students confuse higher-order conditioning with stimulus generalization; generalization involves similar stimuli, not a chained conditioning procedure.",
  ["classical conditioning", "stimulus generalization", "extinction"],
  []
),

mk(3, "Learning", "Taste Aversion / Garcia Effect",
  [
    "A rat drinks a novel saccharin solution and several hours later is injected with a drug that causes nausea. After a single trial, the rat avoids saccharin. Which feature of this learning is most unusual compared with standard classical conditioning?",
    "Garcia and Koelling's research showed that rats associate nausea with taste but not with audiovisual cues, while pain is associated with audiovisual cues but not taste. This selectivity reflects what principle?",
    "A cancer patient undergoing chemotherapy develops a strong aversion to a food eaten just before treatment. The nausea occurs hours after eating. This is best explained by which concept?",
  ],
  "Taste aversion (Garcia effect) demonstrates biological preparedness: organisms are evolutionarily primed to associate illness with taste over other cues, and this association forms in a single trial even with a delay of several hours between CS (taste) and US (nausea).",
  [
    "Operant conditioning with negative reinforcement, in which the animal avoids the food to escape an aversive state.",
    "Stimulus discrimination, in which the animal has learned to respond differently to the target taste versus other tastes.",
    "Standard classical conditioning, which requires multiple pairings and a short CS–US interval to form an association.",
  ],
  [
    "Taste aversion is a Pavlovian (classical) conditioned response, not operant; avoidance is the CR, not a reinforced operant behavior.",
    "Stimulus discrimination describes differential responding to similar stimuli after training; it does not account for the one-trial, long-delay acquisition seen here.",
    "Standard classical conditioning typically requires multiple pairings and a contiguous CS–US interval; taste aversion violates both constraints, demonstrating biological preparedness.",
  ],
  "The Garcia effect revealed that conditioning is not equipotential: evolution has prepared certain species to link specific cue–consequence pairs (taste–nausea; visual/auditory–pain) with great efficiency. A single pairing and a US delay of up to several hours still produces strong, durable aversion. This challenges early behaviorist assumptions of equal associability across all stimuli.",
  "Taste aversion is one-trial, delay-tolerant, and biologically prepared — violating the standard classical conditioning rules.",
  "Students apply standard CS–US contiguity rules to taste aversion; remember that hours-long delays can still produce robust conditioning for evolutionarily relevant pairings.",
  ["biological preparedness", "classical conditioning", "higher-order conditioning"],
  []
),

mk(3, "Learning", "Shaping",
  [
    "A therapist wants to teach a nonverbal child to say 'water.' She first rewards any vocalization, then only 'w' sounds, then approximations of 'wa,' and finally the full word. What operant technique is being used?",
    "An animal trainer gets a dolphin to jump through a hoop by rewarding progressively closer approximations to the final behavior. What is the name of this procedure?",
    "Which operant conditioning procedure is most appropriate when the target behavior never occurs spontaneously and therefore cannot be directly reinforced?",
  ],
  "Shaping uses differential reinforcement of successive approximations: behaviors that progressively resemble the target behavior are reinforced while earlier, less similar approximations are extinguished, gradually guiding the organism toward the final target response.",
  [
    "Chaining, in which a sequence of already-learned behaviors is linked together by making each behavior the cue for the next.",
    "Continuous reinforcement, in which every instance of the final target behavior is reinforced from the outset.",
    "Negative reinforcement, in which an aversive stimulus is removed contingent on the target behavior to increase its frequency.",
  ],
  [
    "Chaining links pre-existing discrete behaviors into a sequence; shaping creates an entirely new behavior through gradual approximation.",
    "Continuous reinforcement requires the full target behavior to already occur; shaping is specifically used when the target behavior does not yet exist in the organism's repertoire.",
    "Negative reinforcement increases behavior by removing an aversive stimulus; shaping is a procedure for acquiring new behaviors, not a reinforcement type.",
  ],
  "Shaping is the operant procedure used to establish novel behaviors that are not initially present. The trainer selectively reinforces behaviors that incrementally approximate the final target, extinguishing previously accepted approximations as the criterion advances. B.F. Skinner developed and formalized shaping as a core applied behavior analysis technique.",
  "Shaping builds new behaviors step by step via differential reinforcement of successive approximations toward a target.",
  "Students confuse shaping with chaining; chaining links existing behaviors in sequence, while shaping gradually sculpts a brand-new behavior.",
  ["operant conditioning", "differential reinforcement", "extinction"],
  []
),

mk(3, "Learning", "Continuous vs Partial Reinforcement: Resistance to Extinction",
  [
    "Two groups of rats are trained to press a lever for food. Group A receives food every time they press (continuous reinforcement). Group B receives food on a variable-ratio schedule. When reinforcement is then withheld entirely, which group will extinguish more slowly?",
    "A gambler who wins only occasionally continues gambling for a very long time after prizes are no longer available. Which reinforcement concept best explains this persistence?",
    "Why does behavior trained on a partial reinforcement schedule show greater resistance to extinction than behavior trained on a continuous schedule?",
  ],
  "Behavior trained on a partial (intermittent) reinforcement schedule is more resistant to extinction than continuously reinforced behavior because the organism has learned that non-reinforcement does not signal the end of the contingency — the partial reinforcement extinction effect (PREE).",
  [
    "Continuous reinforcement produces stronger conditioning because the organism always receives feedback, making extinction harder.",
    "The organism on a partial schedule extinguishes faster because it has received fewer total reinforcements during training.",
    "Variable-interval schedules produce the greatest resistance to extinction because they generate the highest response rates.",
  ],
  [
    "Continuous reinforcement actually produces faster extinction; the organism immediately detects the change to non-reinforcement because reinforcement had been 100% reliable.",
    "Fewer total reinforcements do not predict extinction rate; the unpredictability of reward timing — not total number of rewards — underlies resistance to extinction.",
    "Variable-ratio schedules, not variable-interval schedules, produce the highest response rates (and greatest resistance to extinction); VI schedules produce moderate, steady rates.",
  ],
  "The partial reinforcement extinction effect (PREE) states that intermittently reinforced behavior is harder to extinguish than continuously reinforced behavior. During partial reinforcement, the organism cannot easily discriminate between 'being reinforced intermittently' and 'extinction,' so responding persists longer after reinforcement ceases. This principle explains why habits formed under unpredictable reward (e.g., gambling, social media checking) are especially difficult to break.",
  "Partial reinforcement → greater resistance to extinction (PREE); continuous reinforcement → fast extinction once withheld.",
  "Students assume more reinforcement during training means more resistance to extinction; the opposite is true — continuous reinforcement makes the shift to extinction immediately detectable.",
  ["operant conditioning schedules", "variable-ratio schedule", "extinction"],
  []
),

mk(3, "Learning", "Insight Learning",
  [
    "Köhler's chimpanzee Sultan, after a period of apparent inactivity, suddenly stacks boxes and uses a stick to retrieve a banana hanging out of reach. This abrupt solution best illustrates which type of learning?",
    "A student struggles with a mathematics problem and sets it aside. The next morning, upon waking, the solution suddenly becomes apparent. Which learning concept does this exemplify?",
    "Which feature most distinguishes insight learning from trial-and-error learning?",
  ],
  "Insight learning (Köhler) is characterized by a sudden, complete solution to a problem — the 'aha moment' — that emerges after a period of mental reorganization of the problem elements, without gradual, incremental trial-and-error behavior.",
  [
    "Latent learning, in which knowledge is acquired during exploration without reinforcement and expressed only when motivation arises.",
    "Observational learning, in which the solution is acquired by watching another individual perform the behavior.",
    "Shaping, in which successive approximations to the solution are reinforced until the complete behavior emerges gradually.",
  ],
  [
    "Latent learning involves covert acquisition of information during aimless exploration; insight involves active problem-solving followed by sudden restructuring — reinforcement and motivation are not the distinguishing factors.",
    "Observational learning requires a model; insight occurs through the learner's own internal cognitive reorganization with no model present.",
    "Shaping is an operant procedure that builds behavior incrementally; insight is defined by the sudden, all-or-none nature of the solution.",
  ],
  "Wolfgang Köhler documented insight learning in chimpanzees in the 1920s, arguing that problem-solving can involve cognitive restructuring rather than mere stimulus–response associations. The hallmarks are a pause (incubation), followed by an abrupt, complete, and transferable solution. Insight challenged behaviorist accounts by demonstrating that cognitive events beyond observable behavior shape learning.",
  "Insight = sudden 'aha' solution via mental restructuring; no gradual trial-and-error, no external reinforcement required.",
  "Students confuse insight with latent learning; latent learning is about unreinforced exposure stored for later use, while insight is about sudden internal problem restructuring.",
  ["latent learning", "observational learning", "cognitive learning"],
  []
),

mk(3, "Learning", "Latent Learning",
  [
    "Tolman allowed one group of rats to explore a maze freely with no food reward, then introduced food to the goal box. These rats immediately matched the performance of rats that had been rewarded throughout. What does this demonstrate?",
    "A child who has never been explicitly taught the layout of their neighborhood can immediately guide a lost adult through it. Which learning concept best explains this ability?",
    "Latent learning most directly challenges which assumption of early behaviorism?",
  ],
  "Latent learning (Tolman) demonstrates that organisms can acquire and store knowledge (form cognitive maps) during unreinforced exploration, and this learning becomes behaviorally manifest only when motivation (incentive) is introduced.",
  [
    "Insight learning, in which problem-solving occurs through sudden cognitive reorganization during an active problem-solving episode.",
    "Operant conditioning, in which behavior is acquired because it is systematically reinforced by environmental consequences.",
    "Observational learning, in which behavior is acquired by watching and imitating a model's reinforced actions.",
  ],
  [
    "Insight involves active problem-solving with a sudden solution; latent learning involves passive exploration with no problem to solve and no sudden restructuring event.",
    "Operant conditioning requires reinforcement to shape behavior; latent learning is defined by the absence of reinforcement during the acquisition phase.",
    "Observational learning requires a model; latent learning occurs through the organism's own unsupervised exploration of the environment.",
  ],
  "Edward Tolman's latent learning experiments showed that rats formed cognitive maps of mazes during unrewarded exploration. When food was introduced, these rats outperformed controls that had never explored the maze, demonstrating that learning had occurred covertly. Tolman's work was foundational for cognitive psychology, showing that internal representations — not just stimulus–response chains — mediate behavior.",
  "Latent learning: knowledge acquired without reinforcement, revealed only when incentive is provided — supports cognitive (map) view of learning.",
  "Students confuse latent learning with insight; latent learning is unreinforced passive exploration stored as a cognitive map, not active problem-solving.",
  ["insight learning", "cognitive maps", "observational learning"],
  []
),

mk(3, "Memory — Biological Basis", "Long-Term Potentiation",
  [
    "After high-frequency stimulation of a synapse, subsequent low-frequency stimulation produces a larger postsynaptic potential than before. NMDA receptors were required for this change. Which process does this describe?",
    "Hebb's rule states 'neurons that fire together, wire together.' Which molecular mechanism most directly instantiates this rule at the synaptic level?",
    "A researcher blocks NMDA receptors in the hippocampus of a rat before training in a spatial maze. Which outcome is most likely?",
  ],
  "Long-term potentiation (LTP) is a persistent strengthening of synaptic transmission following high-frequency stimulation; it requires NMDA receptor activation (coincidence detection of pre- and postsynaptic activity), leads to AMPA receptor insertion and structural synaptic changes, and is the leading cellular model of memory formation (Hebb's rule).",
  [
    "Long-term depression (LTD), in which low-frequency stimulation weakens synaptic transmission through AMPA receptor endocytosis.",
    "Habituation, in which repeated weak stimulation leads to decreased neurotransmitter release and diminished response.",
    "Synaptic fatigue, in which neurotransmitter depletion from the presynaptic terminal transiently reduces postsynaptic response.",
  ],
  [
    "LTD is the opposite process — it weakens synapses via AMPA receptor removal following low-frequency stimulation; LTP strengthens synapses.",
    "Habituation is a non-associative decrease in response to repeated weak stimuli and does not involve NMDA receptors or persistent synaptic strengthening.",
    "Synaptic fatigue is a transient presynaptic phenomenon involving neurotransmitter depletion; LTP is a persistent, long-lasting postsynaptic enhancement.",
  ],
  "LTP was first described by Bliss and Lømo (1973) and reflects Hebb's postulate that correlated pre- and postsynaptic activity strengthens synaptic connections. The NMDA receptor acts as a coincidence detector: it opens only when glutamate binds AND the postsynaptic membrane is sufficiently depolarized (relieving Mg²⁺ block). Calcium influx through NMDA receptors triggers AMPA receptor insertion and dendritic spine growth, increasing synaptic strength durably.",
  "LTP = NMDA-dependent synaptic strengthening; the cellular mechanism for 'neurons that fire together, wire together' (Hebb's rule).",
  "Students confuse NMDA receptor role in LTP with AMPA receptors; NMDA receptors initiate LTP through Ca²⁺ influx, while AMPA receptor insertion is the downstream expression of LTP.",
  ["state-dependent memory", "hippocampus", "glutamate/NMDA receptor"],
  []
),

mk(3, "Memory — Retrieval", "State-Dependent Memory",
  [
    "A student studies for an exam while anxious. On the day of the exam, she is calm and performs poorly despite knowing the material. A re-test taken while anxious yields much better recall. Which memory principle explains this pattern?",
    "Research shows that information learned while underwater by scuba divers is better recalled underwater than on land. This best illustrates which retrieval principle?",
    "How does state-dependent memory differ from context-dependent memory?",
  ],
  "State-dependent memory refers to superior retrieval when the internal physiological or emotional state at retrieval matches the state during encoding; it is analogous to context-dependent memory but relies on internal rather than external environmental cues.",
  [
    "Encoding specificity principle, which holds that retrieval cues must match the external context present during encoding to maximize recall.",
    "Proactive interference, in which previously learned material impairs recall of newly learned information.",
    "The serial position effect, in which items at the beginning and end of a list are recalled better than those in the middle.",
  ],
  [
    "The encoding specificity principle encompasses both context-dependent and state-dependent effects; state-dependent memory is a specific subtype where the matching cue is an internal state, not an external environmental feature.",
    "Proactive interference involves prior learning disrupting new learning; state-dependent memory involves matching internal conditions between encoding and retrieval, with no interference from prior learning.",
    "The serial position effect relates to the order of items in a list, not to the match between internal states at encoding and retrieval.",
  ],
  "State-dependent memory, demonstrated by Godden and Baddeley (1975) with underwater/land learning and by studies using alcohol or mood states, shows that internal physiological cues become part of the encoded memory trace. Retrieval is optimal when the internal state at recall matches the state during encoding. This explains why mood-congruent recall occurs in depression (easier to recall sad memories when sad) and why drug-induced memories may be inaccessible when sober.",
  "Retrieval is best when internal state at recall matches internal state during encoding — a subtype of encoding specificity.",
  "Students conflate state-dependent memory with context-dependent memory; context-dependent relies on external environmental cues, while state-dependent relies on internal physiological/emotional states.",
  ["encoding specificity", "context-dependent memory", "long-term potentiation"],
  []
),

mk(3, "Memory — Retrieval", "Misinformation Effect",
  [
    "Eyewitnesses to a car accident are later asked 'How fast were the cars going when they smashed into each other?' versus 'when they hit each other?' Those asked the 'smashed' version report higher speeds and are more likely to recall broken glass that wasn't there. Who pioneered research on this phenomenon?",
    "A child recounts an event to a therapist who uses leading questions. Over repeated interviews, the child's account includes details never originally reported. This best illustrates which memory phenomenon?",
    "A researcher asks participants to read a story, then presents misleading post-event information, then tests memory. Accuracy is reduced compared to a control group. Which mechanism best explains this finding?",
  ],
  "The misinformation effect (Loftus) occurs when post-event information — especially misleading questions or suggestions — is incorporated into the original memory trace, distorting recall and producing false memories of details that were never experienced.",
  [
    "Retroactive interference, in which new learning disrupts retrieval of previously learned information through competition at retrieval.",
    "Source monitoring error, in which a person correctly remembers information but misattributes it to the wrong source (e.g., a suggestion rather than the original event).",
    "Repression, in which emotionally threatening memories are pushed out of conscious awareness by the ego's defense mechanisms.",
  ],
  [
    "Retroactive interference involves competing memory traces impairing retrieval; the misinformation effect specifically involves integration of misleading post-event information into the original memory, not mere retrieval competition.",
    "Source monitoring error is a related phenomenon but is a proposed mechanism (misattributing the origin of information) rather than the overarching effect; the misinformation effect is the broader label for distorted memory following post-event suggestion.",
    "Repression is a psychoanalytic defense mechanism; the misinformation effect is an empirically documented cognitive phenomenon involving normal memory malleability, not motivated forgetting.",
  ],
  "Elizabeth Loftus demonstrated that memory is reconstructive, not reproductive. Post-event questions that include misleading presuppositions (e.g., 'the stop sign' when there was none) alter subsequent recall. The misinformation effect has profound implications for eyewitness testimony, forensic interviewing, and therapeutic practice. False memories can feel subjectively vivid and confident.",
  "Memory is reconstructive: post-event misinformation can be incorporated into the original trace, creating confident false memories (Loftus).",
  "Students distinguish the misinformation effect from retroactive interference by content: misinformation inserts false details into memory; retroactive interference simply disrupts recall without necessarily introducing false content.",
  ["source monitoring", "retroactive interference", "eyewitness testimony"],
  []
),

mk(3, "Memory — Encoding", "Levels of Processing",
  [
    "Participants who answer semantic questions about words ('Does this word name a living thing?') show better retention than those who answer rhyming questions ('Does this word rhyme with cat?'). Which theory predicts this finding?",
    "A student rereads her notes five times (shallow processing) but performs worse on the exam than a classmate who wrote practice questions connecting ideas to prior knowledge (deep processing). Which framework best explains this difference?",
    "According to Craik and Lockhart's levels of processing framework, what determines the durability of a memory trace?",
  ],
  "The levels of processing framework (Craik & Lockhart, 1972) proposes that memory durability is determined by the depth of encoding: shallow structural or phonological processing produces weak, short-lived traces, while deep semantic processing — connecting new information to meaning and prior knowledge — produces strong, durable traces.",
  [
    "The multi-store model (Atkinson-Shiffrin), which holds that rehearsal in short-term memory automatically transfers information to long-term memory regardless of processing type.",
    "Encoding specificity, which holds that retrieval success depends on matching retrieval cues to encoding context, not on the depth of initial processing.",
    "The spacing effect, in which distributed practice over time produces better retention than massed practice regardless of processing depth.",
  ],
  [
    "The multi-store model emphasizes the role of rehearsal and transfer between stores; levels of processing shows that the type (depth) of processing, not just the amount of rehearsal, determines trace strength.",
    "Encoding specificity addresses how well retrieval cues match the encoding context; it does not predict that semantic encoding will always outperform phonological encoding regardless of cue type.",
    "The spacing effect is a separate encoding phenomenon about temporal distribution of study; it does not specify the mechanism by which deeper processing improves retention.",
  ],
  "Craik and Lockhart proposed that memory is a by-product of perceptual analysis operating at different levels: structural (visual features), phonological (sound), and semantic (meaning). Deeper semantic processing produces elaborative encoding that creates more interconnected, distinctive memory traces. Elaborative rehearsal — connecting new material to existing knowledge — is far more effective than simple maintenance rehearsal (rote repetition).",
  "Deeper semantic (meaning-based) processing → stronger, more durable memory traces; shallow structural/phonological processing → weak, short-lived traces (Craik & Lockhart).",
  "Students assume more rehearsal time always improves memory; levels of processing shows that the quality (depth) of processing matters more than quantity of repetition.",
  ["encoding specificity", "elaborative rehearsal", "working memory"],
  []
),

mk(3, "Memory — Development", "Childhood Amnesia",
  [
    "Most adults cannot recall autobiographical events from before age 3, despite the fact that infants and toddlers can learn and form memories. What term describes this phenomenon?",
    "Which neurological factor most directly accounts for the inability to form durable explicit autobiographical memories in infancy?",
    "A researcher finds that adults in one culture report earliest memories from age 2.5, while adults in another culture report earliest memories from age 3.5. Which factor likely accounts for this cultural difference in childhood amnesia offset?",
  ],
  "Childhood (infantile) amnesia refers to the inability to consciously recall episodic events from the first two to three years of life; it is primarily attributed to the protracted postnatal maturation of the hippocampus and prefrontal cortex, which are necessary for encoding durable explicit (declarative) memories.",
  [
    "Repression of emotionally charged early memories by psychoanalytic defense mechanisms, as proposed by Freud.",
    "Absence of long-term potentiation in infancy due to insufficient myelination of cortical neurons.",
    "Retroactive interference from later memories overwriting early memory traces through competitive inhibition.",
  ],
  [
    "Freud attributed childhood amnesia to repression, but this is not supported by evidence; modern accounts point to hippocampal immaturity, not motivated forgetting of threatening content.",
    "LTP does occur in the infant hippocampus; the issue is not LTP absence but the structural immaturity and ongoing neurogenesis in the hippocampus that disrupts stable long-term encoding.",
    "Retroactive interference would predict that more experiences lead to more forgetting, but childhood amnesia is not explained by competition among memory traces — hippocampal maturation is the primary mechanism.",
  ],
  "Childhood amnesia was first systematically noted by Freud but is now understood as a neurodevelopmental phenomenon. The hippocampus, critical for encoding episodic memories, undergoes substantial postnatal development through approximately age 3–4. High rates of neurogenesis in the dentate gyrus during infancy may actually disrupt the stability of early engrams. Cultural variation in earliest memories suggests that language development and narrative self-concept (enabled by frontal maturation) also contribute to the offset of childhood amnesia.",
  "Childhood amnesia results from hippocampal/prefrontal immaturity, not repression — durable episodic memory encoding is not possible until approximately age 3.",
  "Students attribute childhood amnesia to Freudian repression; the current consensus centers on hippocampal developmental immaturity and high early neurogenesis disrupting engram stability.",
  ["hippocampus", "explicit memory", "long-term potentiation"],
  []
),

mk(3, "Memory — Capacity", "Chunking and Miller's Law",
  [
    "A novice chess player sees a briefly displayed board position and remembers only 4–5 individual pieces. An expert chess player recalls 20+ pieces from the same position. What cognitive mechanism explains the expert's superiority?",
    "Miller (1956) proposed that the capacity of short-term memory is approximately 7 ± 2 items. A phone number is easier to remember as '555-867-5309' than as '5558675309.' Which principle does this illustrate?",
    "What is the primary way in which chunking increases the effective capacity of working memory?",
  ],
  "Chunking is the process of grouping individual units of information into larger, meaningful units (chunks); because working memory holds approximately 7 ± 2 chunks (Miller's law), chunking increases the total amount of information that can be held by reducing the number of units while increasing their informational content.",
  [
    "Increasing the phonological loop's articulatory rehearsal rate, allowing more items to be refreshed before they decay.",
    "Transferring information from the phonological loop to the visuospatial sketchpad, effectively doubling working memory capacity.",
    "Activating long-term potentiation to strengthen synaptic connections, permanently consolidating chunked items into long-term memory.",
  ],
  [
    "Chunking operates on the informational organization of items into units, not on rehearsal speed; although rehearsal rate affects how many items fit in the phonological loop, chunking is a restructuring process.",
    "Chunking does not transfer information between working memory subsystems; it reorganizes items within memory into fewer, larger units regardless of modality.",
    "Chunking is a temporary organizational strategy that enhances working memory capacity, not a mechanism that induces LTP or consolidation into long-term memory.",
  ],
  "George Miller's 1956 paper 'The Magical Number Seven, Plus or Minus Two' proposed that humans hold 7 ± 2 chunks in short-term memory. A chunk is any meaningful unit — a letter, a word, a pattern — defined by prior knowledge. Expert performance often reflects superior chunking: chess experts perceive board positions as meaningful configurations rather than individual pieces. Modern estimates suggest working memory may hold as few as 4 ± 1 chunks (Cowan, 2001), but the concept of chunking remains central.",
  "Chunking reorganizes information into fewer, larger meaningful units, increasing effective working memory capacity beyond the raw item limit (7 ± 2; Miller's law).",
  "Students confuse chunking with rehearsal; rehearsal keeps items active in memory, while chunking restructures items into larger units to increase capacity.",
  ["working memory", "levels of processing", "encoding"],
  []
),

mk(3, "Sensation & Perception", "Binocular Depth Cues",
  [
    "A patient loses the use of one eye due to injury. Which depth perception ability is most specifically and immediately impaired?",
    "Retinal disparity is greatest for objects that are close to the observer. Why does this make retinal disparity a useful depth cue primarily for nearby objects?",
    "Which of the following depth cues requires two functional eyes and therefore cannot be used by a person with monocular vision?",
  ],
  "Binocular depth cues — retinal disparity and convergence — require input from both eyes; retinal disparity arises because the two eyes receive slightly different images of the same object (more disparate for nearby objects), and the brain uses this difference to compute depth via stereopsis.",
  [
    "Linear perspective, in which parallel lines appear to converge at a distant vanishing point, providing a monocular cue to depth.",
    "Motion parallax, in which near objects appear to move faster than far objects during head movement, providing a monocular depth cue.",
    "Interposition, in which one object partially occluding another indicates that the occluding object is closer, a monocular cue.",
  ],
  [
    "Linear perspective is a monocular (pictorial) cue available from a single eye; it does not require binocular input.",
    "Motion parallax is a monocular cue based on relative motion across the retina during observer movement; it requires only one functional eye.",
    "Interposition is a monocular pictorial cue based on occlusion; it is available to observers with only one eye.",
  ],
  "Binocular depth cues exploit the horizontal separation of the two eyes (~6.5 cm). Retinal disparity — the difference between the two retinal images — is the basis of stereoscopic depth perception (stereopsis), processed in binocular neurons in V1 and extrastriate cortex. Convergence refers to the inward rotation of both eyes to fixate on near objects; proprioceptive signals from the extraocular muscles convey distance information. Both cues degrade for objects beyond ~6 meters, where the geometric differences become negligible.",
  "Binocular cues (retinal disparity, convergence) require two eyes; they provide the richest depth information for near objects and are the basis of stereoscopic 3-D vision.",
  "Students list 'binocular vision' as simply 'seeing with two eyes'; the key is that binocular cues exploit the geometric disparity between two slightly different viewpoints — monocular cues work with one eye.",
  ["monocular depth cues", "perceptual constancy", "visual processing"],
  []
),

mk(3, "Sensation & Perception", "Monocular Depth Cues",
  [
    "A one-eyed artist is able to paint a landscape that appears convincingly three-dimensional. Which category of depth cues makes this possible?",
    "A viewer perceives a building partly hidden behind a tree as farther away than the tree. What monocular depth cue is being used?",
    "The railroad tracks in a photograph appear to converge toward the horizon. This conveys depth through which specific monocular cue?",
  ],
  "Monocular depth cues — including linear perspective, interposition (overlap), texture gradient, relative size, aerial perspective, and motion parallax — can be perceived with a single eye and are the pictorial cues exploited by painters and photographers to convey three-dimensional depth on a two-dimensional surface.",
  [
    "Retinal disparity, in which slightly different images on the two retinas are compared by binocular neurons to calculate depth.",
    "Convergence, in which the inward rotation of both eyes toward a near object signals its distance via proprioceptive feedback.",
    "Stereopsis, in which the brain fuses the two disparate retinal images into a unified percept with depth.",
  ],
  [
    "Retinal disparity is a binocular cue requiring two eyes; a one-eyed observer has no retinal disparity.",
    "Convergence is a binocular cue dependent on both eyes rotating inward simultaneously; it is unavailable to monocular observers.",
    "Stereopsis is the perceptual result of processing binocular retinal disparity; it is unavailable to monocular observers and not a pictorial cue.",
  ],
  "Monocular depth cues are available to a single eye and to cameras. Key examples: (1) linear perspective — parallel lines converge at a vanishing point; (2) interposition — overlapping objects indicate relative distance; (3) texture gradient — surface texture becomes finer with distance; (4) relative size — familiar objects that project smaller retinal images are perceived as more distant; (5) motion parallax — near objects appear to move faster across the visual field during observer movement. These cues are processed in higher visual cortical areas and are sufficient for adequate depth perception in everyday life.",
  "Monocular cues (linear perspective, interposition, texture gradient, relative size, motion parallax) provide depth information from a single eye and are the basis of pictorial depth perception.",
  "Students assume depth perception requires two eyes; monocular cues alone allow substantial depth perception — monocular individuals navigate effectively using these cues.",
  ["binocular depth cues", "perceptual constancy", "top-down processing"],
  []
),

mk(3, "Sensation & Perception", "Perceptual Constancy",
  [
    "A person walking away from you appears to shrink on your retina, yet you perceive them as maintaining constant physical size. What perceptual mechanism accounts for this?",
    "A white piece of paper looks white under bright sunlight and under dim indoor lighting, even though the actual luminance reaching the eye differs enormously. Which perceptual constancy is illustrated?",
    "Perceptual constancy is primarily driven by which type of processing?",
  ],
  "Perceptual constancy is the top-down perceptual mechanism by which the perceived properties of objects (size, shape, brightness, color) remain stable despite changes in the sensory information reaching the retina, because the brain applies prior knowledge and contextual cues to correct for varying viewing conditions.",
  [
    "Bottom-up processing, in which perception is entirely determined by the raw sensory signal reaching the retina without prior knowledge.",
    "Sensory adaptation, in which prolonged stimulation reduces receptor sensitivity, shifting baseline perception.",
    "Feature detection, in which specialized cortical neurons respond selectively to specific stimulus attributes such as edges or orientation.",
  ],
  [
    "Bottom-up processing is driven solely by incoming sensory data; perceptual constancy requires top-down correction using stored knowledge about objects and the environment.",
    "Sensory adaptation involves reduced receptor sensitivity with sustained stimulation; it actually disrupts veridical perception rather than maintaining constancy.",
    "Feature detection is a low-level bottom-up process; while it contributes to initial image analysis, it does not by itself produce the stable percept of a constant object across varying conditions.",
  ],
  "Perceptual constancies (size, shape, brightness, color) reflect the brain's use of top-down processing — stored knowledge, context, and depth cues — to maintain stable object representation across changing sensory input. Size constancy uses depth information (perceived distance) to scale retinal image size: Emmert's law states that perceived size equals retinal size × perceived distance. Failures of constancy produce perceptual illusions (e.g., the Ames room exploits size constancy by distorting depth cues).",
  "Perceptual constancy = top-down correction that keeps perceived object properties stable despite changing retinal images; failure produces illusions.",
  "Students attribute perceptual constancy to the sense organs adapting; constancy is a cortical (top-down) computation, not a peripheral sensory adaptation.",
  ["top-down vs bottom-up processing", "monocular depth cues", "visual illusions"],
  []
),

mk(3, "Attention", "Cocktail Party Effect and Selective Attention",
  [
    "At a noisy party, a person is deeply engaged in conversation but immediately notices their own name spoken across the room. This phenomenon is called the cocktail party effect. Which researcher is associated with studying selective auditory attention using the dichotic listening paradigm?",
    "In Cherry's shadowing experiments, participants attended to one ear while ignoring the other. Which information from the unattended ear reliably broke through into awareness?",
    "Which theoretical model best explains how personally significant stimuli (e.g., one's own name) capture attention even from unattended channels?",
  ],
  "The cocktail party effect (Cherry, 1953) demonstrates that selective attention filters most unattended auditory information, but high-salience stimuli — especially one's own name — can breach attentional selection because they are pre-attentively processed for semantic significance before conscious awareness.",
  [
    "The filter theory (Broadbent), which holds that selection occurs early based purely on physical features, blocking all semantic processing of unattended channels.",
    "The bottleneck model, which proposes that all sensory channels are fully processed semantically before one is selected for conscious awareness.",
    "The spotlight model, which proposes that attention is a spatially limited resource that can only process information within a focused spatial region.",
  ],
  [
    "Broadbent's early filter theory predicts that unattended channels are blocked before semantic analysis; however, the fact that one's own name breaks through demonstrates that some semantic processing does occur for unattended channels, contradicting a strict early filter.",
    "The bottleneck model (a late selection model) posits full semantic processing of all channels; while closer to explaining the cocktail party effect, it overestimates the extent of unattended processing — most unattended content remains unconscious.",
    "The spotlight model is primarily a spatial metaphor for visual attention; auditory selective attention occurs across channels presented to each ear, not across spatial locations in the same sense.",
  ],
  "Cherry's dichotic listening studies showed that participants following one ear (shadowing) could report almost nothing of the unattended ear's content — except physical features (male/female voice) and, crucially, their own name. Treisman's attenuation model synthesized early and late filter theories: the unattended channel is attenuated (not fully blocked), and stimuli with low activation thresholds (highly familiar, personally relevant words) still reach conscious processing. This explains the cocktail party effect.",
  "Selective attention filters most unattended input, but high-salience stimuli (e.g., own name) breach the filter via pre-attentive semantic processing (cocktail party effect; Cherry).",
  "Students apply Broadbent's strict early filter to explain the cocktail party effect; Broadbent's model cannot explain it — Treisman's attenuation model is needed.",
  ["top-down processing", "perceptual constancy", "divided attention"],
  []
),

mk(3, "Consciousness", "Circadian Rhythms",
  [
    "A traveler flying from New York to Tokyo experiences jet lag. The suprachiasmatic nucleus (SCN) of the hypothalamus must re-entrain to the new light–dark cycle. Which hormone primarily signals darkness to the SCN to regulate the sleep–wake cycle?",
    "A patient takes a drug that blocks adenosine receptors. Which immediate effect is most likely?",
    "Which brain structure serves as the master circadian pacemaker, setting the ~24-hour biological clock in mammals?",
  ],
  "Circadian rhythms are ~24-hour biological cycles regulated by the suprachiasmatic nucleus (SCN) of the hypothalamus; the SCN uses light input via the retinohypothalamic tract to entrain the clock, controls melatonin release from the pineal gland (melatonin signals darkness), and monitors adenosine buildup as a homeostatic sleep pressure signal.",
  [
    "Cortisol released from the adrenal cortex, which peaks in the early morning to promote arousal and entrain the circadian clock.",
    "Serotonin released from the raphe nuclei, which directly signals darkness to the hypothalamus to initiate sleep.",
    "Norepinephrine from the locus coeruleus, which serves as the primary signal to the pineal gland for melatonin synthesis.",
  ],
  [
    "Cortisol does show a circadian peak at awakening and contributes to arousal, but melatonin — not cortisol — is the primary hormonal signal of darkness and is directly controlled by the SCN's nocturnal output to the pineal gland.",
    "Serotonin from the raphe nuclei contributes to mood, appetite, and sleep–wake transitions, but it is not the hormone that signals darkness to the SCN; melatonin serves that function.",
    "Norepinephrine from the locus coeruleus promotes arousal; while noradrenergic input contributes to pineal melatonin synthesis via the superior cervical ganglion, it is not itself the primary darkness-signaling hormone.",
  ],
  "The SCN in the anterior hypothalamus is the master circadian pacemaker. Retinal light input via melanopsin-containing ganglion cells suppresses SCN-driven melatonin synthesis in the pineal gland. In darkness, melatonin rises, signaling sleep time. Adenosine accumulates in the brain with prolonged wakefulness, creating homeostatic sleep pressure; caffeine works by blocking adenosine receptors (A1/A2A), promoting wakefulness. The circadian and homeostatic processes interact to govern sleep timing.",
  "SCN (hypothalamus) = circadian master clock; melatonin signals darkness; adenosine signals sleep pressure; caffeine blocks adenosine receptors.",
  "Students attribute circadian rhythm regulation to cortisol or serotonin; melatonin is the primary hormonal darkness signal controlled by the SCN.",
  ["REM sleep", "sleep disorders", "hypothalamus"],
  []
),

mk(3, "Consciousness", "REM Sleep Functions",
  [
    "Participants deprived selectively of REM sleep show impaired performance on emotional regulation tasks and on procedural memory consolidation the following day. Which sleep stage is being deprived?",
    "During which sleep stage is most vivid dreaming reported, and what EEG pattern characterizes this stage?",
    "A patient with REM sleep behavior disorder physically acts out their dreams. Which feature of normal REM sleep is absent in this patient?",
  ],
  "REM (rapid eye movement) sleep is characterized by a desynchronized (low-amplitude, high-frequency) EEG resembling wakefulness, muscle atonia (preventing dream enactment), and vivid dreaming; it plays critical roles in memory consolidation (especially procedural and emotional memories) and emotional processing.",
  [
    "Stage N3 (slow-wave sleep), characterized by high-amplitude delta waves, which is primarily responsible for declarative memory consolidation and physical restoration.",
    "Stage N2 sleep, characterized by sleep spindles and K-complexes, which maintains the transition between light and deep sleep without significant memory consolidation.",
    "Stage N1 sleep, the lightest stage, characterized by theta waves and hypnagogic hallucinations, which has no established memory consolidation function.",
  ],
  [
    "Stage N3 slow-wave sleep primarily consolidates declarative (explicit) memories and is associated with growth hormone release; procedural memory and emotional processing are more dependent on REM sleep.",
    "Stage N2 sleep features sleep spindles that may contribute to memory consolidation, but the vivid dreaming, muscle atonia, and emotional processing functions are specific to REM sleep.",
    "Stage N1 is the transitional stage between wakefulness and sleep with hypnagogic hallucinations; it has no established role in memory consolidation or emotional regulation.",
  ],
  "REM sleep occurs cyclically throughout the night, with REM periods lengthening in later cycles. The pontine brainstem generates REM via cholinergic activation (PGO waves), while monoamines (NE, serotonin) are suppressed. Muscle atonia is produced by glycinergic inhibition of motor neurons. REM sleep contributes to emotional memory consolidation (amygdala-hippocampal processing), threat simulation (Revonsuo), and procedural/skill learning. REM deprivation leads to REM rebound on recovery nights.",
  "REM sleep: desynchronized EEG, muscle atonia, vivid dreams; critical for procedural memory consolidation and emotional processing.",
  "Students assume all memory consolidation occurs during deep sleep (N3); procedural memory and emotional processing are preferentially consolidated during REM sleep.",
  ["circadian rhythms", "sleep disorders", "memory consolidation"],
  []
),

mk(3, "Consciousness", "Sleep Disorders: Narcolepsy vs Sleep Apnea",
  [
    "A patient experiences sudden loss of muscle tone triggered by strong emotions (cataplexy), sleep paralysis, and hypnagogic hallucinations. MRI shows degeneration of lateral hypothalamic neurons. Which disorder does this patient have, and what neurotransmitter is deficient?",
    "A patient's bed partner reports that the patient stops breathing repeatedly during sleep, snores loudly, and is excessively sleepy during the day despite spending 8 hours in bed. Which sleep disorder best fits?",
    "How does the pathophysiology of narcolepsy differ mechanistically from obstructive sleep apnea?",
  ],
  "Narcolepsy results from autoimmune destruction of orexin (hypocretin)-producing neurons in the lateral hypothalamus, causing intrusion of REM phenomena into wakefulness (cataplexy, sleep paralysis, hypnagogic hallucinations); obstructive sleep apnea results from physical upper airway collapse during sleep, causing hypoxia and sleep fragmentation without a neurochemical deficit.",
  [
    "Narcolepsy is caused by GABA deficiency in the brainstem, which fails to maintain REM atonia, allowing motor activity during sleep.",
    "Sleep apnea is caused by reduced dopamine in the arousal centers, preventing normal awakening responses to hypoxic episodes.",
    "Both disorders involve deficient norepinephrine signaling from the locus coeruleus, impairing arousal and sleep stage transitions.",
  ],
  [
    "Narcolepsy involves orexin/hypocretin deficiency, not GABA deficiency; GABA deficiency would more likely cause insomnia or seizure susceptibility.",
    "Sleep apnea is a structural/anatomical disorder of upper airway patency, not a dopamine signaling deficit; dopaminergic dysfunction is associated with restless legs syndrome.",
    "Neither narcolepsy nor sleep apnea is primarily caused by locus coeruleus norepinephrine deficiency; narcolepsy is orexin-mediated and sleep apnea is structural.",
  ],
  "Orexin (hypocretin) neurons in the lateral hypothalamus stabilize wakefulness and suppress REM sleep intrusion; their loss in narcolepsy (type 1) — often via autoimmune HLA-DQB1*06:02-associated attack — leads to REM dissociation phenomena: cataplexy (emotion-triggered atonia), sleep paralysis (REM atonia persisting into wakefulness), and hypnagogic hallucinations (REM dreaming entering the wake-to-sleep transition). Obstructive sleep apnea involves pharyngeal muscle collapse during sleep causing apneic episodes, hypoxia, and arousal fragmentation; it is treated with CPAP, not orexin replacement.",
  "Narcolepsy = orexin/hypocretin neuron loss → REM intrusion into wakefulness; sleep apnea = upper airway obstruction → hypoxia and sleep fragmentation.",
  "Students confuse cataplexy (narcolepsy) with the muscle atonia of REM sleep behavior disorder; in REM behavior disorder, atonia is absent and patients act out dreams — the opposite of cataplexy.",
  ["REM sleep", "circadian rhythms", "limbic system"],
  []
),

mk(3, "Language", "Language Development",
  [
    "Children across vastly different cultures acquire language at similar rates and stages without formal instruction. Chomsky argued this reflects an innate language acquisition device (LAD). Which additional concept did he propose to explain cross-linguistic regularities in grammar?",
    "A child adopted at age 14 from a linguistically deprived environment (no language exposure) fails to acquire full grammatical competence despite years of instruction. Which hypothesis does this support?",
    "What is the strongest evidence that language acquisition has a critical period?",
  ],
  "Chomsky proposed that humans possess an innate language acquisition device (LAD) preprogrammed with universal grammar — abstract syntactic principles shared across all human languages — and that there is a critical period (roughly birth to puberty) during which first language acquisition occurs with ease; after this period, full grammatical competence is difficult to achieve.",
  [
    "The behaviorist account (Skinner), which holds that language is acquired through operant conditioning — imitation, reinforcement, and shaping of verbal behavior.",
    "Vygotsky's sociocultural theory, which holds that language acquisition is entirely dependent on social interaction within the zone of proximal development and has no innate component.",
    "The Whorfian (linguistic relativity) hypothesis, which holds that language determines thought and that children acquire language because their perception is shaped by the language of their culture.",
  ],
  [
    "Skinner's operant account cannot explain the productivity of language (novel sentences never heard before), the regularity of acquisition across cultures, or specific acquisition stages — Chomsky's critique of this view is foundational.",
    "Vygotsky's theory emphasizes social scaffolding and is complementary to Chomsky's nativist view, not an alternative explanation for the critical period or universal grammar; social interaction alone cannot explain why deprived children fail to achieve grammar after puberty.",
    "Linguistic relativity addresses the influence of language on thought, not the mechanism of language acquisition; it does not predict a critical period or universal grammar.",
  ],
  "Chomsky's nativist theory posits that the human brain contains an innate LAD encoding universal grammar — abstract rules (e.g., structure dependence, recursion) shared across all human languages. Evidence includes: cross-cultural universality of acquisition stages, poverty of the stimulus (children acquire rules not explicitly taught), and critical period effects. Genie (a feral child exposed to language after puberty) and second-language studies confirm that grammatical competence is severely impaired when first language exposure is delayed beyond the critical period (~12 years).",
  "Chomsky: LAD + universal grammar + critical period; full grammatical competence requires language exposure during the critical developmental window.",
  "Students confuse the critical period for language with sensitive periods for accent acquisition; the critical period specifically concerns grammatical (syntactic) competence, while accent acquisition has a somewhat earlier sensitive window.",
  ["Broca's vs Wernicke's aphasia", "lateralization", "cognitive development"],
  []
),

mk(3, "Language", "Broca's vs Wernicke's Aphasia",
  [
    "A stroke patient can understand spoken language perfectly but speaks only in halting, effortful, telegraphic phrases ('want… food… go… home'). Where is the lesion most likely located?",
    "A patient speaks fluently and at length but uses meaningless words and neologisms, and cannot understand spoken or written language. Which aphasia does this represent?",
    "Both Broca's and Wernicke's areas are located in which cerebral hemisphere in most right-handed individuals?",
  ],
  "Broca's aphasia (non-fluent, expressive) results from damage to Broca's area (left inferior frontal gyrus, BA 44/45) and causes halting, telegraphic speech with preserved comprehension; Wernicke's aphasia (fluent, receptive) results from damage to Wernicke's area (left posterior superior temporal gyrus, BA 22) and causes fluent but meaningless speech with severely impaired comprehension.",
  [
    "Damage to the right hemisphere causes Broca's aphasia in right-handed individuals because the right hemisphere controls language production.",
    "Global aphasia results from isolated damage to Wernicke's area, producing both fluent speech and intact comprehension with impaired reading.",
    "Conduction aphasia results from Broca's area damage and is characterized by fluent speech, intact comprehension, but impaired repetition.",
  ],
  [
    "In approximately 95% of right-handed individuals, language is lateralized to the left hemisphere; damage to the right hemisphere does not cause Broca's aphasia.",
    "Global aphasia results from large left perisylvian lesions affecting both Broca's and Wernicke's areas; it produces both nonfluent speech and impaired comprehension — not fluent speech.",
    "Conduction aphasia results from damage to the arcuate fasciculus (connecting Broca's and Wernicke's areas), producing fluent speech, intact comprehension, but severely impaired repetition — not from Broca's area damage per se.",
  ],
  "Broca's area (left inferior frontal gyrus) coordinates speech production and syntactic processing; damage causes non-fluent, effortful speech with intact comprehension ('knows what to say, can't say it'). Wernicke's area (left posterior superior temporal gyrus) is critical for language comprehension and semantic selection; damage causes fluent but semantically empty speech — word salad, paraphasias, neologisms — with severely impaired comprehension ('speaks freely, says nothing meaningful'). The two areas are connected by the arcuate fasciculus.",
  "Broca's = non-fluent speech, intact comprehension (left frontal); Wernicke's = fluent word-salad, impaired comprehension (left temporal).",
  "Students reverse the comprehension deficits: Broca's aphasia spares comprehension; Wernicke's aphasia impairs it — the opposite of what the fluency pattern might suggest.",
  ["lateralization", "split-brain research", "language development"],
  []
),

mk(3, "Neuroscience", "Lateralization",
  [
    "A commissurotomy ('split-brain') patient is shown a word in the left visual field. The patient cannot verbally report the word but can select the corresponding object with the left hand. Which hemisphere processed the word, and why could the patient not verbally report it?",
    "Which cognitive functions are predominantly lateralized to the left hemisphere in most right-handed individuals?",
    "The corpus callosum serves what primary function in cerebral lateralization?",
  ],
  "The left hemisphere is dominant for language, analytic reasoning, and sequential processing in most right-handed individuals; the right hemisphere specializes in spatial processing, holistic pattern recognition, and prosody; the corpus callosum enables interhemispheric communication, allowing both hemispheres to share information.",
  [
    "Language is distributed equally across both hemispheres in right-handed individuals, with the right hemisphere handling spoken language and the left handling written language.",
    "The right hemisphere is dominant for language production in most individuals because Broca's area is located in the right frontal lobe.",
    "The corpus callosum lateralizes function by actively suppressing the non-dominant hemisphere during language tasks.",
  ],
  [
    "Language is strongly lateralized to the left hemisphere in ~95% of right-handers and ~70% of left-handers; the division is not by modality (spoken vs. written) but by hemisphere.",
    "Broca's area is in the left inferior frontal gyrus in the vast majority of right-handed individuals; the right hemisphere is not dominant for language production.",
    "The corpus callosum integrates and shares information between hemispheres; it does not actively suppress the non-dominant hemisphere — its surgical section (commissurotomy) reveals independent hemispheric processing, not suppression.",
  ],
  "Cerebral lateralization refers to the functional specialization of the two hemispheres. Left hemisphere: language (Broca's and Wernicke's areas), analytic/sequential processing, positive affect. Right hemisphere: spatial processing, face recognition, holistic pattern recognition, prosody, negative affect. The corpus callosum (300 million axons) normally integrates hemispheric processing, masking lateralization. Wada test (intracarotid sodium amobarbital) and fMRI confirm left-language dominance in >95% of right-handers.",
  "Left hemisphere: language, analytic processing; right hemisphere: spatial, holistic processing; corpus callosum integrates both hemispheres.",
  "Students assume right-handers always have strict left-hemisphere language dominance; approximately 5% of right-handers and 30% of left-handers have right or bilateral language representation.",
  ["split-brain research", "Broca's vs Wernicke's aphasia", "prefrontal cortex"],
  []
),

mk(3, "Neuroscience", "Split-Brain Research",
  [
    "Sperry's split-brain patients could not name objects placed in their left hand with their eyes closed. What does this reveal about the right hemisphere?",
    "A split-brain patient views 'HE•ART' on a screen, with 'HE' in the left visual field and 'ART' in the right visual field. When asked what they saw, the patient says 'ART.' When asked to point with the left hand, the patient points to a picture of a man. What does this demonstrate?",
    "Sperry's split-brain research provided the strongest evidence for which concept?",
  ],
  "Sperry's split-brain research (Nobel Prize 1981) demonstrated that each hemisphere independently processes contralateral sensory information and has specialized cognitive functions; the left hemisphere has language and produces verbal reports, while the right hemisphere is mute but can guide motor responses with the contralateral (left) hand.",
  [
    "That the left hemisphere controls both sides of the body for fine motor tasks when the corpus callosum is intact.",
    "That language is distributed bilaterally, with each hemisphere capable of independent language production after commissurotomy.",
    "That the corpus callosum is necessary for transferring motor commands from the left hemisphere to the right hand.",
  ],
  [
    "Motor control is contralateral for each hemisphere; the left hemisphere controls the right hand and the right hemisphere controls the left hand — commissurotomy prevents cross-hemispheric motor coordination but does not change which hemisphere controls which hand.",
    "Split-brain research demonstrated the opposite: the right hemisphere lacks speech production (is mute for verbal report); language production is a left-hemisphere specialization.",
    "The corpus callosum transfers sensory and cognitive information between hemispheres; motor commands to the contralateral hand arise directly from the contralateral motor cortex via the corticospinal tract, not via the corpus callosum.",
  ],
  "Roger Sperry and Michael Gazzaniga studied patients who had undergone corpus callosotomy for intractable epilepsy. Because the optic chiasm is intact, each hemisphere receives input only from the contralateral visual field. The left hemisphere (language-dominant) verbally reports right visual field stimuli; the right hemisphere (mute but spatially competent) can guide the left hand to select corresponding objects. The two hemispheres can simultaneously hold conflicting information, revealing that consciousness may not be unitary.",
  "Split-brain: each hemisphere independently processes contralateral input; left hemisphere speaks, right hemisphere guides left hand — corpus callosum normally integrates both (Sperry).",
  "Students think split-brain patients are functionally impaired in daily life; they appear largely normal because most information arrives bilaterally (sound, smell, proprioception) and the divided hemispheres develop compensatory strategies.",
  ["lateralization", "Broca's vs Wernicke's aphasia", "corpus callosum"],
  []
),

mk(3, "Neuroscience", "Prefrontal Cortex Functions",
  [
    "A patient with bilateral damage to the ventromedial prefrontal cortex (Phineas Gage-type injury) shows intact intelligence test scores but makes poor decisions in everyday life, cannot plan ahead, and acts impulsively. Which functions are specifically disrupted?",
    "Working memory tasks require holding information in mind while performing operations on it. Which brain region is most critical for working memory maintenance and manipulation?",
    "Which component of the prefrontal cortex is most associated with inhibiting prepotent responses and delaying gratification?",
  ],
  "The prefrontal cortex (PFC) supports executive functions: working memory (dorsolateral PFC), impulse control and inhibition of prepotent responses (ventrolateral PFC and anterior cingulate), planning and decision-making (ventromedial PFC), and flexible goal-directed behavior; damage produces executive dysfunction with spared basic cognition.",
  [
    "The hippocampus, which is the primary region for working memory and executive planning based on its role in memory consolidation.",
    "The parietal cortex, which governs executive functions by integrating multisensory information for goal-directed action.",
    "The basal ganglia, which control executive functions through direct projections to frontal motor cortex for voluntary movement initiation.",
  ],
  [
    "The hippocampus is critical for encoding and consolidating long-term declarative memories, not for real-time working memory maintenance or executive control, which depend on the PFC.",
    "The parietal cortex integrates sensory information and supports spatial attention and tool use; executive functions (planning, impulse control, working memory) are PFC-dependent.",
    "The basal ganglia contribute to habit formation and procedural learning and modulate PFC via corticostriatal loops, but executive functions — particularly working memory and decision-making — are directly dependent on PFC cortical circuits.",
  ],
  "The dorsolateral PFC (dlPFC) is critical for working memory — holding and manipulating information online. The ventromedial PFC (vmPFC) integrates emotional signals (somatic markers; Damasio) into decision-making. The orbitofrontal cortex (OFC) evaluates reward and punishment. The anterior cingulate cortex (ACC) monitors conflict and error. Adolescent impulsivity reflects the protracted maturation of the PFC (not complete until mid-20s), while the limbic system matures earlier — producing the developmental mismatch underlying risk-taking behavior.",
  "PFC = executive function hub: dlPFC for working memory; vmPFC for decision-making; PFC damage causes impulsivity and poor planning with intact basic intelligence.",
  "Students assume IQ tests would detect PFC damage; standard IQ tests do not assess executive function — PFC patients can have normal IQ but catastrophic real-world decision-making.",
  ["limbic system", "dopamine reward pathway", "lateralization"],
  []
),

mk(3, "Neuroscience", "Limbic System Structures",
  [
    "A patient with bilateral amygdala damage (Urbach-Wiethe disease) shows normal intelligence but fails to recognize fearful facial expressions and does not exhibit fear conditioning. Which limbic structure is specifically implicated?",
    "Damage to the hippocampus (as in patient H.M.) produces anterograde amnesia for declarative information while sparing procedural memory. Which limbic structure is critical for declarative memory consolidation?",
    "Which limbic structure is most directly involved in evaluating the emotional significance of stimuli and triggering the fear response?",
  ],
  "The limbic system structures most critical for MCAT include: the amygdala (emotional evaluation, fear conditioning, threat detection), the hippocampus (spatial navigation and declarative memory consolidation), and the anterior cingulate cortex (emotion regulation, conflict monitoring); each has distinct and clinically testable roles.",
  [
    "The cerebellum, which processes emotional memory and fear responses through its connections with the amygdala.",
    "The thalamus, which directly generates the fear response and emotional memories through its glutamatergic projections to the cortex.",
    "The basal ganglia, which consolidate declarative memories and mediate fear conditioning through striatal-amygdala circuits.",
  ],
  [
    "The cerebellum is involved in motor learning, timing, and coordination; it does not directly mediate fear conditioning or declarative memory consolidation — these are amygdala and hippocampus functions, respectively.",
    "The thalamus serves as a sensory relay station and does contribute a rapid 'low road' pathway to the amygdala for fear responses (LeDoux), but the thalamus itself does not generate fear or store emotional memories — that is the amygdala's role.",
    "The basal ganglia are involved in procedural/habit learning and reward processing; declarative memory consolidation depends on the hippocampus, and fear conditioning depends on the amygdala, not the basal ganglia.",
  ],
  "Joseph LeDoux identified two amygdala activation pathways: the 'low road' (thalamus → amygdala; fast, crude fear response) and the 'high road' (thalamus → cortex → amygdala; slower, context-rich appraisal). The hippocampus encodes spatial and episodic memories, forming cognitive maps (O'Keefe & Dostrovsky; Nobel 2014). Patient H.M. (bilateral hippocampectomy) demonstrated that the hippocampus is necessary for consolidating new declarative memories but not for previously stored procedural skills or immediate working memory.",
  "Amygdala = fear/emotion evaluation; hippocampus = declarative memory consolidation; anterior cingulate = emotion regulation and conflict monitoring.",
  "Students conflate hippocampus and amygdala functions; fear conditioning requires the amygdala, while episodic memory consolidation requires the hippocampus — H.M. had intact fear responses with no new declarative memory.",
  ["prefrontal cortex", "dopamine reward pathway", "long-term potentiation"],
  []
),

mk(3, "Neuroscience", "Dopamine Reward Pathway",
  [
    "Rats with electrodes implanted in the nucleus accumbens will press a lever to self-stimulate this area to the exclusion of eating or sleeping. Which neurotransmitter and pathway mediates this effect?",
    "Unexpected receipt of a reward activates dopaminergic neurons in the VTA. Unexpected omission of an expected reward suppresses these neurons. This pattern is consistent with which computational concept?",
    "Cocaine blocks dopamine reuptake transporters, while amphetamine causes dopamine efflux from the presynaptic terminal. Both produce euphoria. Which common mechanism underlies their reward effects?",
  ],
  "The mesolimbic dopamine reward pathway projects from the ventral tegmental area (VTA) to the nucleus accumbens (NAc) and prefrontal cortex; dopamine neurons in this pathway encode reward prediction errors — firing more than baseline for unexpected rewards and less for unexpected omissions — and their activity underlies motivation, reinforcement learning, and addiction.",
  [
    "The nigrostriatal dopamine pathway, which projects from the substantia nigra to the striatum and mediates reward processing and addiction.",
    "The serotonin pathway from the raphe nuclei to the limbic system, which directly generates pleasure and encodes reward prediction errors.",
    "The norepinephrine pathway from the locus coeruleus to the prefrontal cortex, which mediates the hedonic (pleasure) component of rewards.",
  ],
  [
    "The nigrostriatal pathway (substantia nigra → striatum) is primarily involved in motor control and habit formation; its degeneration causes Parkinson's disease — it does not mediate pleasure or addiction in the way the mesolimbic (VTA → NAc) pathway does.",
    "Serotonin contributes to mood, appetite, and impulse control but does not encode reward prediction errors; the pleasure/reward signal is primarily dopaminergic in the mesolimbic pathway.",
    "Norepinephrine from the locus coeruleus mediates arousal, attention, and stress responses; hedonic pleasure and reward prediction errors are functions of mesolimbic dopamine, not norepinephrine.",
  ],
  "Schultz et al. (1997) demonstrated that VTA dopamine neurons encode reward prediction errors (RPE): they fire above baseline for better-than-expected outcomes, at baseline for expected outcomes, and below baseline for worse-than-expected outcomes. This signal drives reinforcement learning by updating value estimates. The mesolimbic pathway (VTA → NAc → PFC) is the central substrate for natural rewards (food, sex, social interaction) and for drugs of abuse (cocaine, amphetamine, opioids, alcohol), all of which elevate NAc dopamine.",
  "Mesolimbic dopamine (VTA → NAc): encodes reward prediction errors, drives motivation and reinforcement learning; all major drugs of abuse elevate NAc dopamine.",
  "Students equate dopamine with 'pleasure'; dopamine more precisely signals reward prediction error (wanting/anticipation) rather than hedonic pleasure (liking), which involves opioid and endocannabinoid systems.",
  ["serotonin and mood regulation", "GABA and anxiety", "prefrontal cortex"],
  []
),

mk(3, "Neuroscience", "Serotonin and Mood Regulation",
  [
    "A patient is prescribed a selective serotonin reuptake inhibitor (SSRI) for major depressive disorder. Which mechanism of action explains the therapeutic effect?",
    "Serotonergic neurons projecting from the raphe nuclei regulate which physiological and psychological functions?",
    "A patient taking an MAOI (monoamine oxidase inhibitor) and an SSRI simultaneously risks which life-threatening syndrome, and why?",
  ],
  "Serotonin (5-HT) is synthesized in and released from the raphe nuclei; it modulates mood, sleep, appetite, impulsivity, and pain; SSRIs block the serotonin reuptake transporter (SERT), increasing synaptic 5-HT and producing antidepressant effects after 2–4 weeks of receptor downregulation.",
  [
    "SSRIs block postsynaptic serotonin receptors, preventing overstimulation and thereby stabilizing mood in depression.",
    "SSRIs increase serotonin synthesis in raphe neurons by providing a precursor molecule (tryptophan) to the rate-limiting enzyme.",
    "SSRIs inhibit monoamine oxidase (MAO), preventing serotonin degradation and thereby increasing available serotonin.",
  ],
  [
    "SSRIs block the presynaptic reuptake transporter (SERT), not postsynaptic receptors; blocking postsynaptic receptors would reduce serotonergic transmission, worsening depression.",
    "SSRIs do not provide tryptophan or affect serotonin synthesis; they increase synaptic 5-HT by preventing reuptake of already-released serotonin.",
    "MAO inhibitors, not SSRIs, prevent serotonin degradation; SSRIs act on the transporter protein, not the metabolic enzyme MAO.",
  ],
  "The dorsal and median raphe nuclei are the primary source of serotonergic projections throughout the brain. Serotonin modulates mood (depression, anxiety), sleep–wake cycles (via interaction with circadian mechanisms), appetite (5-HT2C receptors suppress feeding), pain (descending modulation), and impulsivity. SSRIs take 2–4 weeks to produce clinical antidepressant effects because autoreceptor desensitization must occur. Combining an SSRI with an MAOI causes serotonin syndrome (hyperthermia, agitation, clonus, autonomic instability) due to massive 5-HT accumulation.",
  "Serotonin from raphe nuclei regulates mood, sleep, appetite, and impulsivity; SSRIs block SERT to increase synaptic 5-HT; SSRI + MAOI → serotonin syndrome.",
  "Students think SSRIs work immediately; SSRIs produce clinical antidepressant effects only after 2–4 weeks because autoreceptor desensitization must occur before full serotonergic enhancement is achieved.",
  ["dopamine reward pathway", "GABA and anxiety", "dopamine hypothesis of schizophrenia"],
  []
),

mk(3, "Neuroscience", "Dopamine Hypothesis of Schizophrenia",
  [
    "First-generation antipsychotics (e.g., haloperidol) reduce positive symptoms of schizophrenia (hallucinations, delusions) by blocking D2 receptors. What does this suggest about the pathophysiology of positive symptoms?",
    "A patient treated with high doses of a D2 receptor blocker develops tardive dyskinesia (repetitive involuntary movements). Which dopamine pathway is most likely affected?",
    "Clozapine (an atypical antipsychotic) treats both positive and negative symptoms of schizophrenia with lower rates of extrapyramidal side effects. It blocks D4 and 5-HT2A receptors more than D2. What does this suggest about the limitations of the original dopamine hypothesis?",
  ],
  "The dopamine hypothesis of schizophrenia proposes that positive symptoms (hallucinations, delusions) result from hyperactivity of D2 receptors in the mesolimbic pathway; all effective antipsychotics block D2 receptors, but the updated hypothesis recognizes mesocortical dopamine hypoactivity underlying negative symptoms and the importance of serotonin modulation.",
  [
    "Positive symptoms result from serotonin hyperactivity in the limbic system, explaining why 5-HT2A blockers alone are sufficient as antipsychotics.",
    "Positive symptoms reflect GABA deficiency in the prefrontal cortex, which disinhibits subcortical dopamine release.",
    "Positive symptoms are caused by glutamate excess at AMPA receptors, which is why NMDA receptor antagonists worsen psychosis.",
  ],
  [
    "Serotonin hyperactivity alone does not cause positive symptoms and is not the primary mechanism; 5-HT2A blockade is an adjunct in atypical antipsychotics that reduces extrapyramidal effects, not a stand-alone antipsychotic mechanism.",
    "GABA deficiency in the PFC is a proposed contributor to negative symptoms and cognitive deficits via disinhibition, but the primary evidence for positive symptoms centers on mesolimbic D2 hyperactivity, not GABA deficiency.",
    "NMDA receptor hypofunction (not AMPA excess) is proposed to explain negative and cognitive symptoms; NMDA antagonists (PCP, ketamine) produce psychosis-like states — but this is the glutamate hypothesis, a supplement to, not the original dopamine hypothesis.",
  ],
  "The dopamine hypothesis emerged from observations that drugs increasing dopamine (amphetamine) cause paranoid psychosis and drugs blocking D2 (chlorpromazine) reduce psychosis. The updated model: mesolimbic D2 hyperactivity → positive symptoms; mesocortical D1/D2 hypoactivity → negative symptoms and cognitive deficits. Atypical antipsychotics (clozapine, risperidone, olanzapine) block D2 with high 5-HT2A blockade, reducing extrapyramidal side effects (since 5-HT2A blockade releases dopamine in the nigrostriatal pathway). Tardive dyskinesia reflects D2 receptor supersensitivity in the nigrostriatal pathway after chronic blockade.",
  "Schizophrenia positive symptoms: mesolimbic D2 hyperactivity → treated by D2 blockers; negative symptoms: mesocortical dopamine hypoactivity; atypicals also block 5-HT2A.",
  "Students apply the dopamine hypothesis uniformly to all schizophrenia symptoms; negative symptoms and cognitive deficits reflect dopamine hypoactivity in the mesocortical pathway — the opposite direction from positive symptoms.",
  ["serotonin and mood regulation", "GABA and anxiety", "limbic system"],
  []
),

mk(3, "Neuroscience", "GABA and Anxiety",
  [
    "A patient is prescribed a benzodiazepine for acute anxiety. Which mechanism explains the anxiolytic effect?",
    "Alcohol's CNS depressant effects are primarily mediated through which neurotransmitter system?",
    "A patient who has been taking benzodiazepines chronically abruptly discontinues. Which withdrawal symptoms are most likely, and why?",
  ],
  "GABA (gamma-aminobutyric acid) is the primary inhibitory neurotransmitter in the CNS; benzodiazepines bind to an allosteric site on the GABA-A receptor (a chloride ion channel), increasing the frequency of chloride channel opening in response to GABA, thereby enhancing inhibition and reducing anxiety; alcohol also potentiates GABA-A and inhibits NMDA receptors.",
  [
    "Benzodiazepines activate GABA-B receptors (G-protein coupled), increasing potassium conductance and hyperpolarizing neurons to produce sedation.",
    "Benzodiazepines directly open GABA-A chloride channels without requiring GABA to be present, mimicking GABA's effect.",
    "Benzodiazepines block glutamate AMPA receptors, reducing excitatory transmission in anxiety circuits as the primary anxiolytic mechanism.",
  ],
  [
    "Benzodiazepines act on GABA-A (ionotropic chloride channel), not GABA-B (metabotropic potassium channel); GABA-B is the target of baclofen (muscle relaxant).",
    "Benzodiazepines are positive allosteric modulators — they increase the frequency of GABA-A channel opening only when GABA is present; they do not directly open channels without GABA (that would be barbiturates at high doses).",
    "Benzodiazepines do not primarily block glutamate AMPA receptors; their mechanism is GABA-A potentiation, not glutamate antagonism.",
  ],
  "GABA-A receptors are pentameric ligand-gated chloride channels. Benzodiazepines bind to the α/γ subunit interface and act as positive allosteric modulators: they increase the frequency (not duration) of chloride channel opening when GABA binds, hyperpolarizing the neuron. Barbiturates increase duration of opening. Benzodiazepine withdrawal causes CNS hyperexcitability (rebound anxiety, insomnia, seizures) because chronic use downregulates GABA-A receptors; abrupt cessation unmasks this hyperexcitability. Alcohol similarly potentiates GABA-A, explaining cross-tolerance with benzodiazepines and why alcohol withdrawal can be treated with benzodiazepines.",
  "GABA is the main CNS inhibitory NT; benzodiazepines increase GABA-A Cl⁻ channel opening frequency (allosteric modulation); abrupt withdrawal → CNS hyperexcitability and seizures.",
  "Students confuse benzodiazepine mechanism (increase channel opening frequency) with barbiturate mechanism (increase channel opening duration); both potentiate GABA-A, but by different allosteric mechanisms.",
  ["glutamate/NMDA receptor", "dopamine hypothesis of schizophrenia", "anxiety disorders"],
  []
),

mk(3, "Neuroscience", "Glutamate and NMDA Receptors",
  [
    "Ketamine produces dissociative anesthesia and, at subanesthetic doses, rapid antidepressant effects in treatment-resistant depression. Which receptor does ketamine primarily block?",
    "Long-term potentiation (LTP) requires NMDA receptor activation. The NMDA receptor is described as a 'coincidence detector.' Which two conditions must be simultaneously met for the NMDA receptor to open?",
    "Phencyclidine (PCP) blocks NMDA receptors and produces symptoms resembling schizophrenia (hallucinations, flat affect, thought disorganization). What does this suggest about the role of NMDA receptors in schizophrenia?",
  ],
  "Glutamate is the primary excitatory neurotransmitter in the CNS; NMDA receptors are ionotropic glutamate receptors that act as coincidence detectors, requiring both glutamate binding AND postsynaptic depolarization (to relieve Mg²⁺ block) to open, allowing Ca²⁺ influx; NMDA hypofunction has been implicated in schizophrenia, and NMDA blockade (ketamine, PCP) induces psychosis-like states.",
  [
    "NMDA receptors are ligand-gated sodium channels that open when glutamate binds, without requiring postsynaptic depolarization.",
    "Ketamine primarily blocks AMPA receptors, preventing glutamate-mediated excitation and producing anesthesia.",
    "Glutamate's primary receptor in anxiety regulation is the GABA-B receptor, which is metabotropic and mediates slow inhibitory effects.",
  ],
  [
    "NMDA receptors are calcium-permeable channels, not sodium channels; crucially, they require both glutamate binding and postsynaptic depolarization (to remove the voltage-dependent Mg²⁺ block) — this dual requirement defines their coincidence-detector function.",
    "Ketamine is an NMDA receptor channel blocker (open-channel blocker), not an AMPA receptor antagonist; AMPA receptor blockade would produce different neurological effects.",
    "GABA-B is an inhibitory metabotropic receptor activated by GABA, not glutamate; glutamate acts on AMPA, NMDA, and kainate receptors (ionotropic) and mGluR receptors (metabotropic).",
  ],
  "NMDA receptors require three conditions for full activation: (1) glutamate binding, (2) glycine/D-serine co-agonist binding, and (3) postsynaptic depolarization to expel the Mg²⁺ ion blocking the channel pore. Ca²⁺ influx through NMDA receptors triggers LTP (via CaMKII activation and AMPA receptor insertion). NMDA hypofunction — as modeled by ketamine or PCP — produces positive, negative, and cognitive symptoms resembling schizophrenia, supporting the glutamate hypothesis of schizophrenia as complementary to the dopamine hypothesis. Ketamine's rapid antidepressant effect (within hours) is thought to involve AMPA receptor upregulation and BDNF release.",
  "NMDA receptor = coincidence detector requiring glutamate + depolarization (Mg²⁺ relief); Ca²⁺ influx drives LTP; NMDA blockade (ketamine/PCP) produces psychosis-like states.",
  "Students think NMDA receptors open with glutamate alone; the Mg²⁺ voltage-dependent block means glutamate is necessary but not sufficient — postsynaptic depolarization is also required.",
  ["GABA and anxiety", "long-term potentiation", "dopamine hypothesis of schizophrenia"],
  []
),

];
