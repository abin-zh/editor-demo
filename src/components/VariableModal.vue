<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>设置变量</h3>
        <button @click="closeModal" class="close-button">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>变量标题:</label>
          <input 
            v-model="title" 
            type="text" 
            placeholder="请输入变量标题"
            class="title-input"
          />
        </div>
        
        <div class="form-group">
          <label>占位符文本:</label>
          <input 
            v-model="placeholder" 
            type="text" 
            placeholder="请输入占位符文本"
            class="placeholder-input"
          />
        </div>
        
        <div class="preview-section">
          <label>预览:</label>
          <div class="preview-content">
            <variable 
              :data-title="title || '未设置标题'"
              :data-comment="placeholder || '未设置占位符'"
              class="variable-preview"
            >
              {{ selectedText }}
            </variable>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">取消</button>
        <button @click="confirmChanges" class="confirm-button">确认</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'

interface Props {
  visible: boolean
  selectedText: string
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm', data: { title: string; placeholder: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const title = ref('')
const placeholder = ref('')

// 监听弹窗显示状态，重置数据
const { visible } = toRefs(props)
watch(visible, (newVisible) => {
  if (newVisible) {
    title.value = ''
    placeholder.value = ''
  }
})

const closeModal = () => {
  emit('close')
}

const confirmChanges = () => {
  if (!title.value.trim()) {
    alert('请输入变量标题')
    return
  }
  
  if (!placeholder.value.trim()) {
    alert('请输入占位符文本')
    return
  }
  
  emit('confirm', {
    title: title.value.trim(),
    placeholder: placeholder.value.trim()
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.close-button:hover {
  background: #e5e7eb;
  color: #374151;
}

.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 500;
}

.title-input,
.placeholder-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.15s ease;
}

.title-input:focus,
.placeholder-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.preview-section {
  margin-top: 24px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.preview-content {
  margin-top: 8px;
  padding: 12px;
  background: white;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.variable-preview {
  color: #73aaff;
  text-decoration: underline;
  position: relative;
  cursor: pointer;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.cancel-button {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.cancel-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.confirm-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.confirm-button:hover {
  background: #2563eb;
}

.confirm-button:active {
  background: #1d4ed8;
}
</style> 