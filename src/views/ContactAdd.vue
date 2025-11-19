<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
   
    <ContactForm :contact="contact" @submit:contact="addContact" />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },
  data() {
    return {
    
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
        hobbies: [],          
        maritalStatus: "",    
      },
    };
  },
  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert("Liên hệ đã được thêm thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
