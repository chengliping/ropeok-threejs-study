<template>
  <div>
    <ul>
      <li
        v-for="(item,key) in alarmInfoStatisticsByType"
        :key="key"
      >
        {{ item.alarmType }} - {{ item.alarmCount }}
      </li>
    </ul>
  </div>
</template>
<script>
import { util } from '../../js/tools/util';
import { api, JSONHeader } from '../../../config/api-config';
import { axios } from '../../js/tools/axios';
export default {
  components: {},
  data () {
    return {
      alarmInfoStatisticsByType: []
    };
  },
  created () {

  },
  mounted () {
    this.postLocalJson();
    this.postLocalJsonContentTypeJSON();
    this.getLocalJson();
    this.deleteLocalJson();
    this.putLocalJson();
    this.patchLocalJson();
  },
  methods: {
    /**
     * get提交  content-type为form
     * @returns {Promise.<void>}
     */
    async getRemoteJson () {
      const result = await axios.get('/remove-api/users', { data: 111 }).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为form
     * @returns {Promise.<void>}
     */
    async postLocalJson () {
      const result = await axios.post(api.alarmInfo.alarmInfoStatisticsByType, { data: 111 }).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    /**
     * post提交  content-type为JSON
     * @returns {Promise.<void>}
     */
    async postLocalJsonContentTypeJSON () {
      const result = await axios.post(api.alarmInfo.alarmInfoStatisticsByType, { data: 111 }, JSONHeader).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async getLocalJson () {
      const result = await axios.get(api.alarmInfo.alarmInfoStatisticsByType, { id: 1 }).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async deleteLocalJson () {
      const result = await axios.delete(api.alarmInfo.alarmInfoStatisticsByType).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async putLocalJson () {
      const result = await axios.put(api.alarmInfo.alarmInfoStatisticsByType, { data: 111 }).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    },
    async patchLocalJson () {
      const result = await axios.patch(api.alarmInfo.alarmInfoStatisticsByType, { data: 111 }).then((res) => {
        const data = util.verifyResponse(res);
        console.log(data);
        if (data) {
          return data;
        } else {
          return false;
        }
      }).catch((e) => {
        console.error(e);
        return false;
      });
      if (result) {
        console.log(result);
        this.alarmInfoStatisticsByType = result;
      }
    }
  }
};
</script>

<style scoped lang="less">

</style>
