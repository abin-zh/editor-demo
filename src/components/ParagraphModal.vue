<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>编辑段落内容</h3>
        <button @click="closeModal" class="close-button">×</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>标题:</label>
          <input 
            v-model="title" 
            type="text" 
            placeholder="请输入标题"
            class="title-input"
          />
        </div>
        
        <div class="paragraphs-container">
          <div 
            v-for="(item, index) in paragraphsData" 
            :key="item.id"
            class="paragraph-item"
          >
            <label>段落 {{ index + 1 }}:</label>
            <div class="input-group">
              <div class="input-wrapper">
                <label class="input-label">内容:</label>
                <input 
                  v-model="item.label" 
                  type="text" 
                  :placeholder="item.placeholder"
                  class="paragraph-input"
                />
              </div>
              <div class="input-wrapper">
                <label class="input-label">占位符:</label>
                <input 
                  v-model="item.placeholder" 
                  type="text" 
                  placeholder="请输入占位符文本"
                  class="paragraph-input placeholder-input"
                />
              </div>
            </div>
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
import { ref, reactive, toRefs, watch } from 'vue'

interface ParagraphData {
  id: string
  label: string
  value: string
  placeholder: string
}

interface Props {
  visible: boolean
  paragraphs: ParagraphData[]
  initialTitle?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm', data: { title: string; paragraphs: ParagraphData[] }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const title = ref('')
const paragraphsData = reactive<ParagraphData[]>([])

// 监听props变化，更新本地数据
const updateData = () => {
  paragraphsData.splice(0, paragraphsData.length, ...props.paragraphs)
  title.value = props.initialTitle || ''
}

// 当组件变为可见时更新数据
const { visible } = toRefs(props)
watch(visible, (newVisible) => {
  if (newVisible) {
    updateData()
  }
})

const closeModal = () => {
  emit('close')
}

const confirmChanges = () => {
  emit('confirm', {
    title: title.value,
    paragraphs: [...paragraphsData]
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
  max-width: 600px;
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

.title-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.15s ease;
}

.title-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.paragraphs-container {
  space-y: 16px;
}

.paragraph-item {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.paragraph-item > label {
  display: block;
  margin-bottom: 12px;
  color: #374151;
  font-weight: 600;
  font-size: 15px;
}

.input-group {
  display: flex;
  gap: 16px;
}

.input-wrapper {
  flex: 1;
}

.input-label {
  display: block;
  margin-bottom: 6px;
  color: #374151;
  font-weight: 500;
  font-size: 13px;
}

.paragraph-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.15s ease;
}

.paragraph-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.placeholder-input {
  background: #fff;
}

.placeholder-input:focus {
  background: #fff;
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