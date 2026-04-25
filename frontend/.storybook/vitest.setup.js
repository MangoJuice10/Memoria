"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue3_vite_1 = require("@storybook/vue3-vite");
var projectAnnotations = require("./preview");
// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
(0, vue3_vite_1.setProjectAnnotations)([projectAnnotations]);
