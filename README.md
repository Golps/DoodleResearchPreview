<div align="center">

# Doodle
### Research Preview

**Testing Apple’s MobileCLIP2 models on hand-drawn sketches.**

Compare five models with recognition running locally in your browser.

**[Open the research preview](https://golps.github.io/DoodleResearchPreview/)**

</div>

![An actual drawing round: S0 recognizes a house as the outline takes shape.](media/drawing.gif)

*An illustrative successful round with a fixed prompt and actual local inference. S0’s optional sketch assist is enabled. This is not an accuracy or speed benchmark.*

## A canvas for research

Doodle explores sketch recognition through a drawing game. A sketch begins as a few lines and gradually becomes a recognizable subject. Each animated character represents a distinct Apple MobileCLIP2 image encoder, providing a way to observe differences in recognition, response time, and the demands of running models on a personal device.

The research questions are practical: How do models respond to incomplete shapes? What changes when a larger model looks at the same image? How much vocabulary can we make available without sending each drawing to a server?

**The models run locally.** Drawings are not sent to a hosted inference service. No API key, subscription, or account is required to run inference. The host serves static files; the browser does the recognition.

What makes it a useful test bed for Apple's models:

- **Five sizes side by side.** Every bot sees the same drawing at the same moment, so you can watch where a small model gives up and a large one keeps going.
- **Unfinished drawings.** The bots guess while you draw, not only at the end. That shows how each model handles a few lines, a half-finished outline, and a sketch that turns into something else halfway through.
- **A real device, not a lab.** Everything runs in an ordinary browser tab, so the preview also shows what these models cost in download size, memory and waiting time on a laptop or a phone.
- **A large, everyday vocabulary.** Free Play covers 14,507 subjects, from "cat" to "peacock" to "paint roller".

## Start drawing

1. Let the first model load, then choose **Start drawing**. On desktop, other models can join as they become ready.
2. In **Rounds**, draw the familiar word shown above the canvas. The 60-second timer starts with your first stroke. **Clear** erases the drawing without restarting the round.
3. In **Free Play**, type and select a subject from the broader word bank, choose **Next**, and draw it. Synonyms share answer groups where configured.
4. A matching guess highlights the answer and ends the round immediately. Choose **Next** to continue.
5. Open **Settings → Testing** to compare model results against a captured drawing. The image and its ranked matches are kept together. Use the S0 sketch-assist switch for a comparison without that additional readout.

On phones and tablets, **S0 loads first** so you can start drawing right away, and S2, B and S3 follow on their own. The first visit downloads about 270 MB, so use Wi‑Fi. S4 is left out on phones and tablets, and the other four run on the phone's processor rather than its graphics chip. See [Why phones work differently](#why-phones-work-differently). On a computer, all five run on the graphics chip and load in order, and the next model downloads in the background while the current one gets ready.

Address options, mostly for testing:
- `?all=1` loads every model even if earlier crashes switched this tab to one model at a time.
- `?single=1` loads one model at a time; switch by tapping a bot.
- `?ask=1` loads only S0 on a phone until you tap another bot.
- `?mem=1` shows how much memory the models use. After a crash, it also shows what the page was doing when it stopped.
- `?cpu=none` puts a phone's bots back on the graphics chip, and `?cpu=s3,s4` moves the listed models to the processor on a computer.
- `?s4=1` brings S4 back on a phone or tablet, for testing only.
- `?recycle=N` sets how many guesses pass before the bots restart between rounds (phones default to 120).
- [`probe.html`](https://golps.github.io/DoodleResearchPreview/probe.html) measures how much graphics memory the browser allows one page.

If the browser resets its graphics memory, the bots restart from the copy saved on your device and your drawing is redrawn. If the page reloads twice while models are loading, that tab switches to one model at a time.

Bots don't repeat a word within a round. If you pause for about two seconds, each bot may offer up to two runner-up words that scored close to its first pick.

## Five views of the same sketch

| Model | What it adds to the comparison |
| :--- | :--- |
| **S0** | The smallest encoder and recommended starting point on phones. Optional sketch assistance in Rounds. |
| **S2** | A larger efficient encoder to compare with S0. |
| **B** | A base vision transformer with a different architecture from the S-series. |
| **S3** | A larger efficient encoder with a wider embedding representation. |
| **S4** | The largest S-series encoder in this preview. Computers only, because of its memory needs. |

These are **MobileCLIP2 image–text models**, not Apple’s Foundation Models framework. Bigger does not guarantee a better result on an individual doodle.

The current word bank contains **14,507 recognition concepts**, **8,909 configured aliases**, and **231 familiar round prompts**. The models rank this prepared vocabulary. They do not generate unrestricted descriptions, and adding a word does not guarantee it will be recognized reliably.

**The November 2026 word bank update** added 2,507 common, drawable words that were missing, like "peacock", "trophy" and "daisy". The original 12,000 leaned on rare dictionary terms. The new words were encoded with the same Apple text models and matched to the original word vectors, so old and new words sit on the same scale. Every extra word is one more thing a bot can mistake your drawing for, so words that kept stealing first guesses from the right answer were left out. On a test set of 2,760 Quick, Draw! doodles, first guesses dropped by about one percentage point in exchange for the larger vocabulary. That test only covers its 345 categories, so it can't credit the new words themselves.

![The current desktop interface after a real successful recognition.](media/recognition.png)

## Reading the results

Each model independently compares the drawing with its matching text representations. Similarity scores describe relative matches; **they are not probabilities or calibrated confidence estimates**. Bots’ thinking phrases, expressions, and timing are interface animations and do not expose internal reasoning.

S0’s optional assistance uses a project-fitted sketch readout over frozen Apple features. It is enabled in Rounds by default. Disable it in Testing to compare native image–text matching. The other models use image–text matching, and Free Play uses the broad word bank.

This preview supports exploration of sketch-based retrieval, interactive learning, and creative interfaces. Game outcomes alone do not validate those applications or establish a scientific ranking of the models.

## Practical limits

- **Memory:** Model weights stay in 8-bit form while running, the smallest size that gives the same answers as the original models. On a computer, all five use roughly 0.6 to 0.9 GB, almost all of it graphics memory. On phones, the four bots use roughly 360 MB. Safari may still reload the page on a device that's short on memory.
- **Loading:** Model and vocabulary files are large. A first visit may take time, particularly on a slow connection. Files are cached when browser storage allows; storage can be evicted or unavailable.
- **Browser support:** Development focuses on Macs, iPhones, and iPads. Computers use the graphics chip (WebGPU) when the browser supports it. Phones and tablets use the processor (WebAssembly). Speed and stability vary by browser and device, and testing in a simulated phone is not proof that a real one will hold up.
- **Speed on phones:** Running on the processor keeps phones stable but makes the bigger bots slower. B and S3 can take a second or more per guess.
- **Recognition:** Unfinished drawings, unusual concepts, handwriting, abstraction, and ambiguous shapes can produce incorrect guesses. Recognition is limited to the prepared vocabulary and alias groups.
- **Sound:** Game effects stop when the page is backgrounded. On iPhone, Silent mode may mute them. The preview does not promise to bypass Silent mode without system media controls.
- **Measurement:** This is an exploratory research interface, not a calibrated benchmark. The README animation demonstrates one successful round with sketch assistance; it is not representative performance evidence.

## Why phones work differently

Getting all five models to run together on an iPhone turned out to be the hardest part of this preview. Here's what we learned, in plain terms.

- **Safari gives each tab much less memory than the phone has.** Apple doesn't publish the number, and going over it closes the tab without warning. All five models together need about 620 MB, which was too much. S4 alone is more than half of that, so phones and tablets leave it out. It still runs on computers.
- **Safari's graphics chip support for this kind of work is still young.** Even with S4 gone and memory steady at about 295 MB, Safari kept crashing in the middle of a guess on the graphics chip. Other developers have reported the same thing ([onnxruntime#27584](https://github.com/microsoft/onnxruntime/issues/27584)). So on phones and tablets, the bots run on the processor instead. It's slower, but it hasn't crashed in our testing so far.
- **The bots take a short break every so often.** On phones, after about 120 guesses the bots restart between rounds and reload from the copy saved on the phone. That clears out anything that builds up over a long session.
- **Smaller models were tried and rejected.** Shrinking S4 to 4-bit would have saved memory, but it changed S4's top guess on about 1 in 10 Free Play drawings. For a preview about comparing Apple's models, keeping their answers faithful mattered more.

These choices may change as Safari improves. The `?cpu=none` and `?s4=1` options exist to retest them on new iOS versions.

## About this repository

This repository contains **the compiled browser build**, its model and vocabulary assets, documentation, demonstration media, and applicable notices. Source workspaces, preparation tools, local evaluations, credentials, private notes, and source maps are excluded.

To inspect the build locally, clone it into the default `DoodleResearchPreview` directory and serve its parent directory:

```sh
git clone https://github.com/Golps/DoodleResearchPreview.git
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000/DoodleResearchPreview/**. Keep the repository folder name: the compiled asset paths use that base path. Model loading requires a compatible browser; the local server performs no inference.

## Research terms and acknowledgments

Made possible by Apple’s publicly released MobileCLIP2 models. This is an independent project, without Apple endorsement.

**Apple Machine Learning Research Model is licensed under the Apple Machine Learning Research Model License Agreement.** The model agreement limits use to qualifying non-commercial scientific research and excludes commercial exploitation and product development. The complete [Apple model agreement](licenses/Apple-AMLR.txt) controls model use; [model notes](licenses/MODEL-NOTES.txt) describe the browser adaptations and provenance.

Project-owned interface material is provided under the [Doodle Research Preview License](LICENSE). React, Motion, ONNX Runtime Web, other software, and data retain their own terms. Their [acknowledgments and license notices](licenses/THIRD_PARTY_NOTICES.md) are included with the build.
