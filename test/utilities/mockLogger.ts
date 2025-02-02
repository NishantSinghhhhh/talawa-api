import type { FastifyBaseLogger } from "fastify";
import { vi } from "vitest";

interface MockLoggerConfig {
	level?: string;
	enabledLevels?: Set<string>;
}

export const createMockLogger = (
	config?: MockLoggerConfig,
): FastifyBaseLogger => {
	const level = config?.level ?? "info";
	const enabledLevels =
		config?.enabledLevels ??
		new Set(["error", "warn", "info", "debug", "trace", "fatal", "silent"]);

	const logger = {
		error: vi.fn(),
		warn: vi.fn(),
		info: vi.fn(),
		debug: vi.fn(),
		trace: vi.fn(),
		fatal: vi.fn(),
		silent: vi.fn(),
		child: () => createMockLogger(config),
		level,
		isLevelEnabled: (l: string) => enabledLevels.has(l),
		bindings: vi.fn().mockReturnValue({}),
		flush: vi.fn(),
		isFatalEnabled: () => enabledLevels.has("fatal"),
		isErrorEnabled: () => enabledLevels.has("error"),
		isWarnEnabled: () => enabledLevels.has("warn"),
		isInfoEnabled: () => enabledLevels.has("info"),
		isDebugEnabled: () => enabledLevels.has("debug"),
		isTraceEnabled: () => enabledLevels.has("trace"),
		isSilentEnabled: () => enabledLevels.has("silent"),
	};

	return logger as unknown as FastifyBaseLogger;
};
