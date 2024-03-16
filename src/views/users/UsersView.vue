<template>
  <v-container>
    <div>
      <h1>Usuarios</h1>
    </div>
    <div>
      <v-btn class="add-btn" @click="addUser()">Agregar</v-btn>
    </div>
    <v-table fixed-header class="styled-table">
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Documento</th>
          <th class="text-left">Posición</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id" class="active-row">
          <td>{{ item.name }}</td>
          <td>{{ item.identification }}</td>
          <td>{{ item.position }}</td>
          <td>
            <v-btn class="ma-2" color="indigo" icon="mdi-check">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      users: [
        {
          id: "123",
          name: "Frozen Yogurte",
          identification: "Frozen Yogurt",
          position: "159",
        },
        {
          id: "1234",
          name: "Frozen Yogurtg",
          identification: "Frozen Yogurt",
          position: "159",
        },
        {
          id: "1235",
          name: "Frozen Yogurtr",
          identification: "Frozen Yogurt",
          position: "159",
        },
      ],
    };
  },
  methods: {
    addUser: function () {
      router.push("users/add");
    },
  },
};
</script>

<style>
h1 {
  margin: 20px;
}

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row:hover {
  font-weight: bold;
  color: #009879;
}
.add-btn {
  margin: 15px;
}
</style>
