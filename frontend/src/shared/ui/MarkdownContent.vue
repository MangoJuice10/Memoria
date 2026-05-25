<script setup lang="ts">
import { computed } from "vue";
import { marked } from "@/shared/lib/marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    }
  }
});

const props = defineProps<{
  content: string;
}>();

const html = computed(() =>
    DOMPurify.sanitize(marked.parse(props.content) as string)
);
</script>

<template>
  <div class="markdown-content w-full" v-html="html" />
</template>

<style scoped>
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.1rem;
}

.markdown-content :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(ol),
.markdown-content :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(ol) {
  list-style-type: decimal;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
}

.markdown-content :deep(li) {
  margin-bottom: 0.4rem;
  line-height: 1.6;
}

.markdown-content :deep(code) {
  font-family: monospace;
  font-size: 0.875em;
  background: var(--color-tertiary, #f0f0f0);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

.markdown-content :deep(pre) {
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(pre code) {
  padding: 1rem;
  display: block;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid var(--color-border-default, #ccc);
  padding-left: 1rem;
  margin: 0.75rem 0;
  opacity: 0.8;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border-default, #ccc);
  margin: 1rem 0;
}

.markdown-content :deep(a) {
  text-decoration: underline;
  opacity: 0.85;
}

.markdown-content :deep(table) {
  display: block;
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border-default, #ccc);
  white-space: nowrap;
}

.markdown-content :deep(th) {
  font-weight: 600;
}
</style>