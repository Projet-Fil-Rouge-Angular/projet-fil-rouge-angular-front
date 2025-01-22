import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/models/courses/course.model';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  @Input() course: Course | null = null;
  @Output() save = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter<void>();

  formData: Course = {
    id: 0,
    name: '',
    description: '',
    duration: 0,
    durationUnit: 'heures',
    contentMarkdown: '',
    imageUrl: '',
    level: '',
    prerequisites: [],
    tags: [],
  };

  tagInput = '';
  prerequisiteInput = '';

  ngOnChanges(): void {
    if (this.course) {
      this.formData = { ...this.course };
    }
  }

  addTag(): void {
    if (this.tagInput) {
      this.formData.tags.push(this.tagInput);
      this.tagInput = '';
    }
  }

  removeTag(index: number): void {
    this.formData.tags.splice(index, 1);
  }

  addPrerequisite(): void {
    if (this.prerequisiteInput) {
      this.formData.prerequisites.push(this.prerequisiteInput);
      this.prerequisiteInput = '';
    }
  }

  removePrerequisite(index: number): void {
    this.formData.prerequisites.splice(index, 1);
  }
  isFormValid(): boolean {
    return (
      !!this.formData.name &&
      !!this.formData.description &&
      this.formData.duration >= 1 &&
      !!this.formData.contentMarkdown &&
      !!this.formData.imageUrl &&
      !!this.formData.level &&
      this.formData.prerequisites.length > 0 &&
      this.formData.tags.length > 0
    );
  }
  
  onSubmit(): void {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }
    this.save.emit(this.formData);
  }
  
  
}
