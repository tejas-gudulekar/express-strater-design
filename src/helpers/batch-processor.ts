import * as cliProgress from "cli-progress";
import { logger } from "elastic-apm-node";

/**
 * Generic batch processing function.
 *
 * @param items - The array of items to be processed.
 * @param batchSize - The size of each batch.
 * @param processor - A function that processes a batch of items.
 * @returns A promise that resolves when all batches have been processed.
 */
async function batchProcessor<T>(items: T[], batchSize: number, processor: (batch: T[]) => Promise<void>): Promise<void> {
  // Calculate the number of batches needed
  const totalBatches = Math.ceil(items.length / batchSize);

  // Create a new progress bar instance
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(totalBatches, 0);

  for (let i = 0; i < totalBatches; i++) {
    logger.info(`Processing batch ${i} of ${totalBatches}`);
    // Get the current batch of items
    const start = i * batchSize;
    const end = start + batchSize;
    const batch = items.slice(start, end);

    // Process the current batch
    await processor(batch);

    // Update the progress bar
    progressBar.update(i + 1);
  }

  // Stop the progress bar once all batches have been processed
  progressBar.stop();
}

export default batchProcessor;
