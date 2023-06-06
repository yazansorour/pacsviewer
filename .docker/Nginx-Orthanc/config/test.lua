function OnStoredInstance(instanceId, tags, metadata,origin)
    local cmd = "curl -X POST 127.0.0.1/api/method/casting.casting.packs-api.createStudy?instanceID=".. instanceId .. " --header 'Authorization: Basic NTM2OTIyNTk1NzhkNjEzOjIzNTI3NjYzNDE0YjEwYw=='"
    local c =  io.popen(cmd)
    print(c)
end