<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-group">
      <label><strong>Sở thích</strong></label>
      <div class="hobbies-group">
        <label
          v-for="(hobby, index) in hobbies"
          :key="index"
          class="checkbox-item"
        >
          <input
            type="checkbox"
            :id="'hobby-' + index"
            :value="hobby"
            v-model="contactLocal.hobbies"
          />
          {{ hobby }}
        </label>
      </div>
    </div>

    <div class="form-group">
      <label><strong>Tình trạng hôn nhân</strong></label>
      <div class="marital-status">
        <label>
          <input
            type="radio"
            name="maritalStatus"
            value="Độc thân"
            v-model="contactLocal.maritalStatus"
          />
          Độc thân
        </label>
        <label>
          <input
            type="radio"
            name="maritalStatus"
            value="Đã kết hôn"
            v-model="contactLocal.maritalStatus"
          />
          Đã kết hôn
        </label>
      </div>
    </div>

    <div class="form-group form-check favorite-check">
      <label>
        <input
          name="favorite"
          type="checkbox"
          v-model="contactLocal.favorite"
        />
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-secondary" @click="cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: { Form, Field, ErrorMessage },
  emits: ["submit:contact", "delete:contact"],
  props: { contact: { type: Object, required: true } },
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /(09|03|07|08|05)+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
     contactLocal: {
    _id: this.contact._id,   
   ...this.contact,
    hobbies: this.contact.hobbies || [],
   maritalStatus: this.contact.maritalStatus || "",
},
      contactFormSchema,
      hobbies: ["Đọc sách", "Du lịch", "Thể thao", "Nghe nhạc"],
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },
    cancel() {
      const reply = window.confirm(
        "Bạn có chắc muốn thoát mà không lưu không?"
      );
      if (reply) this.$router.push({ name: "contactbook" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";

.error-feedback {
  color: red;
  font-size: 0.9em;
}

.hobbies-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.marital-status {
  display: flex;
  gap: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.checkbox-item input,
.marital-status input {
  margin-right: 6px;
  accent-color: #007bff;
  cursor: pointer;
}

.checkbox-item label,
.marital-status label {
  cursor: pointer;
}

.hobbies-group label:hover,
.marital-status label:hover {
  color: #007bff;
  transition: color 0.2s ease;
}

.favorite-check input {
  margin-right: 6px;
}
</style>
