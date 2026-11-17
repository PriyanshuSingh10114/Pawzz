import { generateCarouselContent, regenerateSlideContent } from '../services/ai/openaiService.js';
import { logWorkflowExecution } from '../services/automation/n8nService.js';

export async function handleGenerateCarousel(req, res) {
  try {
    const {
      topic,
      targetAudience,
      platform,
      contentObjective,
      tone,
      slideCount,
      referenceMaterial,
    } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Topic or idea input is required.',
      });
    }

    const result = await generateCarouselContent({
      topic,
      targetAudience,
      platform,
      contentObjective,
      tone,
      slideCount,
      referenceMaterial,
    });

    // Log the AI workflow execution
    await logWorkflowExecution({
      source: result.meta?.engine || 'Native AI Engine',
      trigger: 'SlidePilot Project Wizard',
      topic,
      status: 'Completed',
      tokensUsed: result.meta?.tokensUsed || 1100,
      latencyMs: result.meta?.latencyMs || 800,
      humanApprovalStatus: 'Draft',
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function handleRegenerateSlide(req, res) {
  try {
    const {
      topic,
      slideNumber,
      totalSlides,
      currentHeadline,
      currentDescription,
      tone,
      customInstruction,
    } = req.body;

    const regenerated = await regenerateSlideContent({
      topic: topic || 'Slide Topic',
      slideNumber: Number(slideNumber) || 1,
      totalSlides: Number(totalSlides) || 6,
      currentHeadline,
      currentDescription,
      tone,
      customInstruction,
    });

    return res.json({ success: true, data: regenerated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
