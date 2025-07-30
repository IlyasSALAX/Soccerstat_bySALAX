<template>
  <v-breadcrumbs :items="items">
    <template #divider>
      <v-icon size="20">mdi-chevron-right</v-icon>
    </template>

    <template #item="{ item, disabled }">
      <router-link
        v-if="item.to && !disabled"
        class="breadcrumb-link"
        exact
        :to="item.to"
      >
        {{ item.title }}
      </router-link>
      <span v-else class="breadcrumb-text">
        {{ item.title }}
      </span>
    </template>
  </v-breadcrumbs>
  <v-divider style="margin-top: -10px;" />
  <br></br>
</template>

<script>
  export default {
    name: 'Breadcrumbs',
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped>
.breadcrumb-link {
  color: #e92222;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}
.breadcrumb-link:hover {
  color: #a60000;
  text-decoration: underline;
  cursor: pointer;
}
.breadcrumb-text {
  color: #777;
  font-weight: 600;
  font-size: 14px;
  user-select: none;
}

/* Дополнительно добавим плавность и чуть больше пространства */
.v-breadcrumbs {
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.03em;
  user-select: none;
}
</style>
